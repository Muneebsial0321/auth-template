import { useHome } from './home.controller';

export default function HomePage() {
  const { data } = useHome();

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}