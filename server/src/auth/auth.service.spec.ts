import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { DbService } from '../db/db.service';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from './jwt.service';

// Mock bcrypt
jest.mock('bcrypt', () => ({
    hash: (pw: string) => Promise.resolve(`hashed_${pw}`),
    compare: (pw: string, hash: string) => Promise.resolve(hash === `hashed_${pw}`),
}));

const mockJwtService = {
    sign: jest.fn(() => 'mock_token'),
    verify: jest.fn(),
};


describe('AuthService', () => {
    let service: AuthService;
    let db: { user: any };
    beforeEach(async () => {
        db = {
            user: {
                findUnique: jest.fn(),
                create: jest.fn(),
                update: jest.fn(),
            },
        };
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: DbService, useValue: db },
                { provide: JwtService, useValue: mockJwtService },
            ],
        }).compile();
        service = module.get<AuthService>(AuthService);
    });

    describe('registerUser', () => {
        it('should throw if email exists', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1 });
            await expect(service.registerUser({ name: 'A', email: 'a@a.com', password: 'pw' }))
                .rejects.toThrow(BadRequestException);
        });
        it('should create user if email not exists', async () => {
            db.user.findUnique.mockResolvedValue(null);
            db.user.create.mockResolvedValue({ id: 1, name: 'A', email: 'a@a.com' });
            const user = await service.registerUser({ name: 'A', email: 'a@a.com', password: 'pw' });
            expect(user).toHaveProperty('token');
            expect(db.user.create).toHaveBeenCalled();
        });
    });

    describe('loginUser', () => {
        it('should throw if user not found', async () => {
            db.user.findUnique.mockResolvedValue(null);
            await expect(service.loginUser({ email: 'a@a.com', password: 'pw' }))
                .rejects.toThrow(UnauthorizedException);
        });
        it('should throw if password invalid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed_other' });
            await expect(service.loginUser({ email: 'a@a.com', password: 'pw' }))
                .rejects.toThrow(UnauthorizedException);
        });
        it('should return user if credentials valid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed_pw' });
            const result = await service.loginUser({ email: 'a@a.com', password: 'pw' });
            expect(result).toHaveProperty('user.id');
            expect(result).toHaveProperty('token');
        });
    });

    describe('forgotPassword', () => {
        it('should do nothing if user not found', async () => {
            db.user.findUnique.mockResolvedValue(null);
            await expect(service.forgotPassword('a@a.com')).resolves.toBeUndefined();
        });
        it('should update password and send mail if user found', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, email: 'a@a.com' });
            db.user.update.mockResolvedValue({});
            await expect(service.forgotPassword('a@a.com')).resolves.toBeUndefined();
            expect(db.user.update).toHaveBeenCalled();
        });
    });

    describe('resetPassword', () => {
        it('should throw if user not found', async () => {
            db.user.findUnique.mockResolvedValue(null);
            await expect(service.resetPassword('a@a.com', 'token', 'pw')).rejects.toThrow(BadRequestException);
        });
        it('should throw if token invalid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'other' });
            await expect(service.resetPassword('a@a.com', 'token', 'pw')).rejects.toThrow(BadRequestException);
        });
        it('should update password if token valid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'token' });
            db.user.update.mockResolvedValue({});
            await expect(service.resetPassword('a@a.com', 'token', 'pw')).resolves.toBeUndefined();
            expect(db.user.update).toHaveBeenCalled();
        });
    });

    describe('changePassword', () => {
        it('should throw if user not found', async () => {
            db.user.findUnique.mockResolvedValue(null);
            await expect(service.changePassword(1, 'old', 'new')).rejects.toThrow(UnauthorizedException);
        });
        it('should throw if old password invalid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed_other' });
            await expect(service.changePassword(1, 'old', 'new')).rejects.toThrow(UnauthorizedException);
        });
        it('should update password if old password valid', async () => {
            db.user.findUnique.mockResolvedValue({ id: 1, password: 'hashed_old' });
            db.user.update.mockResolvedValue({});
            await expect(service.changePassword(1, 'old', 'new')).resolves.toBeUndefined();
            expect(db.user.update).toHaveBeenCalled();
        });
    });
});
