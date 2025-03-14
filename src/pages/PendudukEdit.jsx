import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const PendudukEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [kartu_keluarga_id, setKartuKeluargaId] = useState("");
  const [kkList, setKkList] = useState([]);

  useEffect(() => {
    fetchPenduduk();
    fetchKartuKeluarga();
  }, []);

  // Ambil data penduduk berdasarkan ID
  const fetchPenduduk = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/penduduk/${id}`);
      const data = response.data;
      setNik(data.nik);
      setNama(data.nama);
      setTempatLahir(data.tempat_lahir);
      setTanggalLahir(data.tanggal_lahir);
      setJenisKelamin(data.jenis_kelamin);
      setAgama(data.agama);
      setPekerjaan(data.pekerjaan);
      setKartuKeluargaId(data.kartu_keluarga_id);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Gagal mengambil data penduduk!");
    }
  };

  // Ambil daftar kartu keluarga untuk dropdown
  const fetchKartuKeluarga = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/kartu_keluarga`);
      setKkList(response.data);
    } catch (error) {
      console.error("Error fetching KK:", error);
      toast.error("Gagal mengambil daftar Kartu Keluarga!");
    }
  };

  // Simpan perubahan data
  const updatePenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/penduduk/${id}`, {
        nik,
        nama,
        tempat_lahir: tempatLahir,
        tanggal_lahir: tanggalLahir,
        jenis_kelamin: jenisKelamin,
        agama,
        pekerjaan,
        kartu_keluarga_id,
      });
      toast.success("Data penduduk berhasil diperbarui!");
      navigate("/penduduk");
    } catch (error) {
      console.error("Error updating data:", error);
      if (error.response?.data) {
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
      <h1 className="text-2xl font-bold mb-4">Edit KTP Penduduk</h1>
      <form onSubmit={updatePenduduk} className="space-y-4">
        <div>
          <label className="block font-semibold">NIK</label>
          <input 
            type="text" 
            value={nik} 
            onChange={(e) => setNik(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Nama</label>
          <input 
            type="text" 
            value={nama} 
            onChange={(e) => setNama(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Tempat Lahir</label>
          <input 
            type="text" 
            value={tempatLahir} 
            onChange={(e) => setTempatLahir(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Tanggal Lahir</label>
          <input 
            type="date" 
            value={tanggalLahir} 
            onChange={(e) => setTanggalLahir(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Jenis Kelamin</label>
          <select 
            value={jenisKelamin} 
            onChange={(e) => setJenisKelamin(e.target.value)} 
            className="border p-2 w-full rounded" 
            required
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Agama</label>
          <input 
            type="text" 
            value={agama} 
            onChange={(e) => setAgama(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Pekerjaan</label>
          <input 
            type="text" 
            value={pekerjaan} 
            onChange={(e) => setPekerjaan(e.target.value)} 
            className="border p-2 w-full rounded" 
            required 
          />
        </div>
        <div>
          <label className="block font-semibold">Kartu Keluarga</label>
          <select 
            value={kartu_keluarga_id} 
            onChange={(e) => setKartuKeluargaId(e.target.value)} 
            className="border p-2 w-full rounded" 
            required
          >
            <option value="">Pilih Kartu Keluarga</option>
            {kkList.map((kk) => (
              <option key={kk.id} value={kk.id}>
                {kk.nomor_kk} - {kk.kepala_keluarga}
              </option>
            ))}
          </select>
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
            className="bg-blue-500 text-white p-2 rounded w-1/2 hover:bg-blue-600 transition"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </div>
  );
};

export default PendudukEdit;
