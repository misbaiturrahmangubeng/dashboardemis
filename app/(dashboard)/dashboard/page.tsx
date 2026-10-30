import { fetchFromSpreadsheet } from "@/lib/spreadsheet";
import { Users, UserCheck, UserX, GraduationCap } from "lucide-react";
import StatCard from "@/components/dashboard/StatCards";

// Definisi Tipe berdasarkan file referensi Daftar_Siswa_2026_2027_Ganjil_*.xlsx
interface Siswa {
  NISN: string;
  Status: string;
  JenisKelamin: string;
  TingkatRombel: string;
}

export default async function DashboardPage() {
  // Ambil data langsung dari server via GAS (TIDAK terekspos di browser)
  const response = await fetchFromSpreadsheet("GET_STUDENTS");
  const data: Siswa[] = response.data || [];

  // Kalkulasi Statistik
  const totalSiswa = data.length;
  const siswaAktif = data.filter(s => s.Status?.toLowerCase() === "aktif").length;
  const siswaLaki = data.filter(s => s.JenisKelamin?.toLowerCase() === "laki-laki").length;
  const siswaPerempuan = totalSiswa - siswaLaki;

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Dashboard Pantauan EMIS</h1>
        <p className="text-slate-500 mt-1">Ringkasan data siswa madrasah terintegrasi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Siswa" value={totalSiswa} icon={Users} color="bg-blue-600" />
        <StatCard title="Siswa Aktif" value={siswaAktif} icon={UserCheck} color="bg-emerald-500" />
        <StatCard title="Siswa Laki-laki" value={siswaLaki} icon={GraduationCap} color="bg-indigo-500" />
        <StatCard title="Siswa Perempuan" value={siswaPerempuan} icon={GraduationCap} color="bg-pink-500" />
      </div>

      {/* Bagian Grafik (Gunakan Recharts di komponen terpisah berbasis 'use client') */}
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Statistik Kelas & Rombel</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <p className="text-gray-400">Area Grafik Interaktif (Recharts Component)</p>
        </div>
      </div>
    </div>
  );
}
