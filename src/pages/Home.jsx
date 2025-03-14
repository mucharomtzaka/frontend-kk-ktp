import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen text-center">
      <div>
        <h1 className="text-3xl font-bold">Selamat Datang di Aplikasi KK & KTP</h1>
        <p className="mt-2 text-lg">Gunakan menu untuk mengelola data Kartu Keluarga dan KTP Penduduk.</p>

        {/* Tombol Menu */}
        <div className="mt-6 space-x-4">
          <Link to="/kk" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Kelola Kartu Keluarga
          </Link>
          <Link to="/penduduk" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Kelola KTP Penduduk 
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
