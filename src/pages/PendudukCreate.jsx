import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select"; // Import Select2 React
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PendudukCreate = () => {
  const [kartu_keluarga_id, setKartuKeluargaId] = useState(null);
  const [nik, setNik] = useState("");
  const [nama, setNama] = useState("");
  const [tempat_lahir, setTempatLahir] = useState("");
  const [tanggal_lahir, setTanggalLahir] = useState("");
  const [jenis_kelamin, setJenisKelamin] = useState("");
  const [agama, setAgama] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [kartuKeluargaList, setKartuKeluargaList] = useState([]); // List KK
  const navigate = useNavigate();

  // Fetch data Kartu Keluarga dari API
  useEffect(() => {
    const fetchKartuKeluarga = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/kartu_keluarga`);
        const options = response.data.map((kk) => ({
          value: kk.id,
          label: `${kk.nomor_kk} - ${kk.kepala_keluarga}`,
        }));
        setKartuKeluargaList(options);
      } catch (error) {
        console.error("Error fetching kartu keluarga:", error);
      }
    };

    fetchKartuKeluarga();
  }, []);

  const savePenduduk = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/penduduk`, {
        kartu_keluarga_id: kartu_keluarga_id?.value, // Ambil nilai ID
        nik,
        nama,
        tempat_lahir,
        tanggal_lahir,
        jenis_kelamin,
        agama,
        pekerjaan,
      });
      navigate("/penduduk");
    } catch (error) {
      console.error("Error saving data:", error);
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
      <h1 className="text-2xl font-bold mb-4">Tambah KTP Penduduk</h1>
      <form onSubmit={savePenduduk} className="space-y-4">
        <div>
          <label className="block">Kartu Keluarga</label>
          <Select
            options={kartuKeluargaList}
            value={kartu_keluarga_id}
            onChange={setKartuKeluargaId}
            placeholder="Pilih Kartu Keluarga"
            className="border p-2 w-full"
          />
        </div>
        <div>
          <label className="block">NIK</label>
          <input type="text" value={nik} onChange={(e) => setNik(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Nama</label>
          <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Tempat Lahir</label>
          <input type="text" value={tempat_lahir} onChange={(e) => setTempatLahir(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Tanggal Lahir</label>
          <input type="date" value={tanggal_lahir} onChange={(e) => setTanggalLahir(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label className="block">Jenis Kelamin</label>
          <select value={jenis_kelamin} onChange={(e) => setJenisKelamin(e.target.value)} className="border p-2 w-full">
            <option value="">Pilih Jenis Kelamin</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
        <div>
          <label className="block">Agama</label>
          <select value={agama} onChange={(e) => setAgama(e.target.value)} className="border p-2 w-full">
            <option value="">Pilih Agama</option>
            <option value="Islam">Islam</option>
            <option value="Kristen">Kristen</option>
            <option value="Katolik">Katolik</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddha">Buddha</option>
            <option value="Konghucu">Konghucu</option>
          </select>
        </div>
        <div>
          <label className="block">Pekerjaan</label>
          <input type="text" value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)} className="border p-2 w-full" />
        </div>
        <div className="flex gap-2">
        <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded w-1/2 hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-1/2 hover:bg-gray-600 transition ">Simpan</button> 
        </div>
      </form>
    </div>
  );
};

export default PendudukCreate;
