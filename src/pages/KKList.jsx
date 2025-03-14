import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const KKList = () => {
  const [kkData, setKkData] = useState([]);

  useEffect(() => {
    fetchKK();
  }, []);

  const fetchKK = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/kartu_keluarga`);
      setKkData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setKkData([]);
    }
  };

  const deleteKK = async (id) => {
    if (!confirm("Yakin ingin menghapus?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/kartu_keluarga/${id}`);
      toast.success("Kartu Keluarga berhasil dihapus!");
      fetchKK();
    } catch (error) {
      toast.error("Gagal menghapus data!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Kartu Keluarga</h1>
      <div className="flex gap-2 mb-4">
        <Link to="/" className="bg-gray-500 text-white p-2 rounded">Home</Link>
        <Link to="/kk/create" className="bg-blue-500 text-white p-2 rounded">Tambah KK</Link>
      </div>

      <table className="w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Nomor KK</th>
            <th className="p-2 border">Kepala Keluarga</th>
            <th className="p-2 border">Anggota Keluarga</th>
            <th className="p-2 border">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {kkData?.length > 0 ? (
            kkData.map((kk) => (
              <tr key={kk.id} className="border-b">
                <td className="p-2 border">{kk.nomor_kk}</td>
                <td className="p-2 border">{kk.kepala_keluarga}</td>
                <td className="p-2 border">
                  {kk.penduduks?.length > 0 ? (
                    <ul className="list-disc list-inside text-sm">
                      {kk.penduduks.map((p) => (
                        <li key={p.id}>
                          {p.nama} ({p.nik})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-gray-500">Tidak ada anggota keluarga</span>
                  )}
                </td>
                <td className="p-2 border">
                  <Link to={`/kk/edit/${kk.id}`} className="bg-yellow-500 text-white p-1 rounded mx-1">
                    Edit
                  </Link>
                  <button onClick={() => deleteKK(kk.id)} className="bg-red-500 text-white p-1 rounded">
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-2 border text-center text-gray-500">
                Data Kartu Keluarga tidak ditemukan.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default KKList;
