import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const PendudukList = () => {
  const [penduduk, setPenduduk] = useState([]);
  const [kkData, setKkData] = useState([]); // State untuk menyimpan data KK

  useEffect(() => {
    fetchPenduduk();
    fetchKK();
  }, []);

  // Fetch data penduduk
  const fetchPenduduk = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk`);
      setPenduduk(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch data kartu keluarga
  const fetchKK = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/kartu_keluarga`);
      setKkData(response.data); // Simpan data KK ke state
    } catch (error) {
      console.error("Error fetching KK data:", error);
    }
  };

  // Hapus penduduk
  const deletePenduduk = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/penduduk/${id}`);
      toast.success("Penduduk berhasil dihapus!");
      fetchPenduduk();
    } catch (error) {
      toast.error("Gagal menghapus data!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar KTP Penduduk</h1>
      <div className="flex gap-2 mb-4">
        <Link to="/" className="bg-gray-500 text-white p-2 rounded">Home</Link>
        <Link to="/penduduk/create" className="bg-blue-500 text-white p-2 rounded">Tambah KTP Penduduk</Link>
      </div>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">NIK</th>
            <th className="p-2 border">Nama</th>
            <th className="p-2 border">Keluarga</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {penduduk.map((p) => {
            // Temukan KK yang sesuai dengan kartu_keluarga_id penduduk
            const keluarga = kkData.find((kk) => kk.id === p.kartu_keluarga_id);

            return (
              <tr key={p.id}>
                <td className="p-2 border">{p.nik}</td>
                <td className="p-2 border">{p.nama}</td>
                <td className="p-2 border">
                  {keluarga ? (
                    <>
                      {keluarga.kepala_keluarga} ({keluarga.nomor_kk})
                    </>
                  ) : (
                    <span className="text-gray-500">Tidak ditemukan</span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link to={`/penduduk/edit/${p.id}`} className="bg-yellow-500 text-white p-1 rounded mx-1">
                    Edit
                  </Link>
                  <button onClick={() => deletePenduduk(p.id)} className="bg-red-500 text-white p-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PendudukList;
