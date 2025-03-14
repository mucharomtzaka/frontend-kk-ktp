import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const KKCreate = () => {
  const [nomor_kk, setNomorKK] = useState("");
  const [kepala_keluarga, setKepalaKeluarga] = useState("");
  const [alamat, setAlamat] = useState("");
  const navigate = useNavigate();

  const saveKK = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/kartu_keluarga`, {
        nomor_kk,
        kepala_keluarga,
        alamat,
      });
      toast.success("Data berhasil disimpan!");
      navigate("/kk");
    } catch (error) {
      console.error("Error saving data:", error.response?.data);
      if (error.response?.data) {
        // Ambil semua error dari Laravel dan tampilkan di toast
        Object.values(error.response.data).flat().forEach((errMsg) => {
          toast.error(errMsg);
        });
      } else {
        toast.error("Terjadi kesalahan, silakan coba lagi!");
      }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Tambah Kartu Keluarga</h1>
      <form onSubmit={saveKK} className="space-y-4">
        <div>
          <label className="block font-semibold">Nomor KK</label>
          <input
            type="text"
            value={nomor_kk}
            onChange={(e) => setNomorKK(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Kepala Keluarga</label>
          <input
            type="text"
            value={kepala_keluarga}
            onChange={(e) => setKepalaKeluarga(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Alamat</label>
          <input
            type="text"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            className="border p-2 w-full rounded"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded w-1/2 hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded w-1/2 hover:bg-green-600 transition"
          >
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default KKCreate;
