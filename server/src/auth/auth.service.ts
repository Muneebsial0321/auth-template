import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from './jwt.service';
import { OAuth2Client } from 'google-auth-library';

// Black box mail sender
async function sendMail(to: string, subject: string, body: string) {
    const wait = await new Promise((resolve,) => resolve(true))
    console.log({
        to,
        subject,
        body,
        wait
    });
}

@Injectable()
export class AuthService {
    private readonly googleClient = new OAuth2Client({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: "postmessage" ,
    })
    constructor(
        private readonly prisma: DbService,
        private readonly jwtService: JwtService,
    ) { }

    async registerUser(data: { name: string; email: string; password: string }) {
        const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (existing) throw new BadRequestException('Email already registered');
        const hash = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: { name: data.name, email: data.email, password: hash },
        });
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'USER',
        });
        return { user, token };
    }

    async loginUser(data: { email: string; password: string }) {
        const user = await this.prisma.user.findUnique({ where: { email: data.email } });
        if (!user || !user.password) throw new UnauthorizedException('Invalid credentials');
        const valid = await bcrypt.compare(data.password, user.password);
        if (!valid) throw new UnauthorizedException('Invalid credentials');
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'USER',
        });
        return { user, token };
    }

    async forgotPassword(email: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) return;
        const token = Math.random().toString(36).substring(2, 15); // Use a secure token in production
        await this.prisma.user.update({ where: { email }, data: { password: token } });
        await sendMail(email, 'Reset Password', `Your reset token: ${token}`);
    }

    async resetPassword(email: string, token: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.password !== token) throw new BadRequestException('Invalid token');
        const hash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({ where: { email }, data: { password: hash } });
    }

    async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.password) throw new UnauthorizedException('Invalid user');
        const valid = await bcrypt.compare(oldPassword, user.password);
        if (!valid) throw new UnauthorizedException('Old password incorrect');
        const hash = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({ where: { id: userId }, data: { password: hash } });
    }

    async loginWithGoogle(authCode: string) {
        const { tokens } = await this.googleClient.getToken(authCode);
        const ticket = await this.googleClient.verifyIdToken({
            idToken: tokens.id_token!,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email || !payload.name) {
            throw new UnauthorizedException('Invalid Google profile');
        }
        let user = await this.prisma.user.findUnique({ where: { email: payload.email } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    email: payload.email,
                    name: payload.name,
                    provider: 'GOOGLE',
                    picUrl: payload.picture,
                    role: 'USER'
                },
            });
        }
        const token = this.jwtService.sign({
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role || 'USER',
        });
        return { user, token };
    }
}