/**
 * Main Application - CLI Interface
 * File ini adalah entry point aplikasi
 *
 * TODO: Implementasikan CLI interface yang interaktif dengan menu:
 * 1. Tambah Siswa Baru
 * 2. Lihat Semua Siswa
 * 3. Cari Siswa (by ID)
 * 4. Update Data Siswa
 * 5. Hapus Siswa
 * 6. Tambah Nilai Siswa
 * 7. Lihat Top 3 Siswa
 * 8. Keluar
 */

import readlineSync from 'readline-sync';
import StudentManager from './src/StudentManager.js';
import Student from './src/Student.js';

let countId = 1;

function AskString(question) {
  let answer;
  do {
    answer = readlineSync.question(question);
  } while (answer === '');
  return answer;
}

function AskNumber(question) {
  let answer;
  do {
    answer = readlineSync.question(question);
  } while (isNaN(answer) === true || answer === '');
  return Number(answer);
}

// Inisialisasi StudentManager
const manager = new StudentManager();

/**
 * Menampilkan menu utama
 */
function displayMenu() {
  console.log('\n=================================');
  console.log('SISTEM MANAJEMEN NILAI SISWA');
  console.log('=================================');
  console.log('1. Tambah Siswa Baru');
  console.log('2. Lihat Semua Siswa');
  console.log('3. Cari Siswa');
  console.log('4. Update Data Siswa');
  console.log('5. Hapus Siswa');
  console.log('6. Tambah Nilai Siswa');
  console.log('7. Lihat Top 3 Siswa');
  console.log('8. Daftar Siswa Berdasarkan Kelas');
  console.log('9. Statistik Berdasarkan Kelas');
  console.log('0. Keluar');
  console.log('=================================');
}

/**
 * Handler untuk menambah siswa baru
 * TODO: Implementasikan function ini
 * - Minta input: ID, Nama, Kelas
 * - Buat object Student baru
 * - Tambahkan ke manager
 * - Tampilkan pesan sukses/gagal
 */
function addNewStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Siswa Baru ---');
  const idAdd = String(countId++);
  const nameAdd = AskString('Masukkan Nama siswa: ');
  const classAdd = AskString('Masukkan Kelas siswa: ');

  manager.addStudent(new Student(idAdd, nameAdd, classAdd));

  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk melihat semua siswa
 * TODO: Implementasikan function ini
 * - Panggil method displayAllStudents dari manager
 * - Jika tidak ada siswa, tampilkan pesan
 */
function viewAllStudents() {
  // Implementasi di sini
  console.log('\n--- Daftar Semua Siswa ---');
  if (manager.getAllStudents().length === 0)
    return console.log('Tidak ada siswa!');
  manager.getAllStudents().forEach((student) => student.displayInfo());

  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk mencari siswa berdasarkan ID
 * TODO: Implementasikan function ini
 * - Minta input ID
 * - Cari siswa menggunakan manager
 * - Tampilkan info siswa jika ditemukan
 */
function searchStudent() {
  // Implementasi di sini
  console.log('\n--- Cari Siswa ---');
  const id = AskNumber('Masukkan ID siswa: ');

  const data = manager.findStudent(id);

  if (!data) return console.log('Siswa tidak ditemukan!');
  data.displayInfo();
  // manager.findStudent(id).displayInfo();
  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk update data siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data saat ini
 * - Minta input data baru (nama, kelas)
 * - Update menggunakan manager
 */
function updateStudent() {
  // Implementasi di sini
  console.log('\n--- Update Data Siswa ---');

  const id = AskNumber('Masukkan ID siswa: ');

  if (!manager.findStudent(id)) return console.log('Siswa tidak ditemukan!');

  manager.findStudent(id).displayInfo();
  const name = AskString('Masukkan Nama baru: ');
  const kelas = AskString('Masukkan Kelas baru: ');
  manager.updateStudent(id, { name, kelas });

  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk menghapus siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Konfirmasi penghapusan
 * - Hapus menggunakan manager
 */
function deleteStudent() {
  // Implementasi di sini
  console.log('\n--- Hapus Siswa ---');
  const id = AskNumber('Masukkan ID siswa: ');
  manager.removeStudent(id);
  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk menambah nilai siswa
 * TODO: Implementasikan function ini
 * - Minta input ID siswa
 * - Tampilkan data siswa
 * - Minta input mata pelajaran dan nilai
 * - Tambahkan nilai menggunakan method addGrade
 */
function addGradeToStudent() {
  // Implementasi di sini
  console.log('\n--- Tambah Nilai Siswa ---');

  const id = AskString('Masukkan ID siswa: ');

  if (!manager.findStudent(id)) return console.log('Siswa tidak ditemukan!');

  const subject = AskString('Masukkan Mata Pelajaran: ');

  let score;
  do {
    score = AskNumber('Masukkan Nilai: ');
  } while (score < 0 || score > 100);

  manager.findStudent(id).addGrade(subject, score);
  // TODO: Lengkapi implementasi
}

/**
 * Handler untuk melihat top students
 * TODO: Implementasikan function ini
 * - Panggil getTopStudents(3) dari manager
 * - Tampilkan informasi siswa
 */
function viewTopStudents() {
  // Implementasi di sini
  console.log('\n--- Top 3 Siswa ---');

  manager.getTopStudents(3).forEach((student) => student.displayInfo());
  // TODO: Lengkapi implementasi
}

function getStudentsByClassname() {
  // Implementasi di sini
  if (manager.getAllStudents().length === 0)
    return console.log('Tidak ada siswa!');
  console.log('\n--- Daftar Siswa Berdasarkan Kelas ---');
  const classInput = AskString('Masukkan Kelas: ');
  manager
    .getStudentsByClass(classInput)
    .forEach((student) => student.displayInfo());

  // TODO: Lengkapi implementasi
}
/**
 * Main program loop
 * TODO: Implementasikan main loop
 * - Tampilkan menu
 * - Baca input pilihan
 * - Panggil handler yang sesuai
 * - Ulangi sampai user pilih keluar
 */

function getClassStats() {
  console.log('\n--- Kelas Statistik ---');
  const classInput = AskString('Masukkan Kelas: ');
  const data = manager.getClassStatistics(classInput);

  console.log(
    `Jumlah siswa dalam kelas ${classInput}: ${data.numberOfStudents}`
  );
  console.log(`Rata-rata kelas ${classInput}: ${data.average}`);
}
function main() {
  console.log('Selamat datang di Sistem Manajemen Nilai Siswa!');

  // TODO: Implementasikan loop utama program
  let running = true;
  manager.loadFile();

  while (running) {
    manager.saveToFile();
    displayMenu();

    const pilihan = readlineSync.question('Pilih menu (0-9): ');

    switch (pilihan) {
      case '1':
        addNewStudent();
        break;
      case '2':
        viewAllStudents();
        break;
      case '3':
        searchStudent();
        break;
      case '4':
        updateStudent();
        break;
      case '5':
        deleteStudent();
        break;
      case '6':
        addGradeToStudent();
        break;
      case '7':
        viewTopStudents();
        break;
      case '8':
        getStudentsByClassname();
        break;
      case '9':
        getClassStats();
        break;
      case '0':
        running = false;
        break;
      default:
        console.log('Pilihan tidak valid. Silakan pilih lagi.');
    }

    //   // Tampilkan menu
    //   // Baca pilihan user
    //   // Jalankan action sesuai pilihan
    //   // TODO: Lengkapi implementasi

    //   // Hint: gunakan switch-case untuk handle berbagai pilihan
  }

  console.log('\nTerima kasih telah menggunakan aplikasi ini!');
}

// Jalankan aplikasi
main();
