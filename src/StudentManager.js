/**
 * Class StudentManager
 * Mengelola koleksi siswa dan operasi-operasi terkait
 *
 * TODO: Implementasikan class StudentManager dengan:
 * - Constructor untuk inisialisasi array students
 * - Method addStudent(student) untuk menambah siswa
 * - Method removeStudent(id) untuk menghapus siswa
 * - Method findStudent(id) untuk mencari siswa
 * - Method updateStudent(id, data) untuk update data siswa
 * - Method getAllStudents() untuk mendapatkan semua siswa
 * - Method getTopStudents(n) untuk mendapatkan top n siswa
 * - Method displayAllStudents() untuk menampilkan semua siswa
 */

import Student from './Student.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const DATA_FILE = path.join(__dirname, '..', 'StudentData.json');

class StudentManager {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - students: Array untuk menyimpan semua siswa

  constructor() {
    this.students = [];
    // Implementasi constructor di sini
  }

  /**
   * Menambah siswa baru ke dalam sistem
   * @param {Student} student - Object Student yang akan ditambahkan
   * @returns {boolean} true jika berhasil, false jika ID sudah ada
   * TODO: Validasi bahwa ID belum digunakan
   */
  addStudent(student) {
    // Implementasi method di sini
    if (this.findStudent(student.id)) {
      return console.log('Siswa sudah terdaftar!');
    }

    this.students.push(student);
    console.log('Siswa berhasil didaftarkan!');
  }

  /**
   * Menghapus siswa berdasarkan ID
   * @param {string} id - ID siswa yang akan dihapus
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari dan hapus siswa dari array
   */
  removeStudent(id) {
    // Implementasi method di sini

    if (!this.findStudent(id)) return console.log('Siswa tidak ditemukan!');

    this.students = this.students.filter((student) => student.id !== id);
    console.log('Siswa berhasil dihapus!');
  }

  /**
   * Mencari siswa berdasarkan ID
   * @param {string} id - ID siswa yang dicari
   * @returns {Student|null} Object Student jika ditemukan, null jika tidak
   * TODO: Gunakan method array untuk mencari siswa
   */
  findStudent(id) {
    // Implementasi method di sini
    if (this.students.length === 0) return null;

    return this.students.find((student) => student.id == id);
  }

  /**
   * Update data siswa
   * @param {string} id - ID siswa yang akan diupdate
   * @param {object} data - Data baru (name, class, dll)
   * @returns {boolean} true jika berhasil, false jika tidak ditemukan
   * TODO: Cari siswa dan update propertinya
   */
  updateStudent(id, data) {
    const student = this.findStudent(id);

    if (!student) return console.log('Siswa tidak ditemukan!');

    student.name = data.name ? data.name : student.name;

    student.studentClass = data.kelas ? data.kelas : student.studentClass;

    console.log('Data siswa berhasil diupdate!');

    // Implementasi method di sini
  }

  /**
   * Mendapatkan semua siswa
   * @returns {Array} Array berisi semua siswa
   */
  getAllStudents() {
    // Implementasi method di sini
    return this.students;
  }

  /**
   * Mendapatkan top n siswa berdasarkan rata-rata nilai
   * @param {number} n - Jumlah siswa yang ingin didapatkan
   * @returns {Array} Array berisi top n siswa
   * TODO: Sort siswa berdasarkan rata-rata (descending) dan ambil n teratas
   */
  getTopStudents(n) {
    // Implementasi method di sini
    const sortStudent = this.students.sort(
      (a, b) => b.getAverage() - a.getAverage()
    );

    return sortStudent.slice(0, n);
  }

  /**
   * Menampilkan informasi semua siswa
   * TODO: Loop semua siswa dan panggil displayInfo() untuk masing-masing
   */
  displayAllStudents() {
    // Implementasi method di sini
    this.getAllStudents().forEach((student) => student.displayInfo());
  }

  /**
   * BONUS: Mendapatkan siswa berdasarkan kelas
   * @param {string} className - Nama kelas
   * @returns {Array} Array siswa dalam kelas tersebut
   */
  getStudentsByClass(className) {
    // Implementasi method di sini (BONUS)
    return this.students.filter(
      (student) => student.studentClass === className
    );
  }

  /**
   * BONUS: Mendapatkan statistik kelas
   * @param {string} className - Nama kelas
   * @returns {object} Object berisi statistik (jumlah siswa, rata-rata kelas, dll)
   */
  getClassStatistics(className) {
    // Implementasi method di sini (BONUS)
    if (!this.getStudentsByClass(className))
      return console.log('Kelas tidak ditemukan!');
    const numberOfStudents = this.getStudentsByClass(className).length;

    const average = (
      this.getStudentsByClass(className).reduce(
        (acc, student) => acc + student.getAverage(),
        0
      ) / numberOfStudents
    ).toFixed(2);

    return {
      numberOfStudents,
      average,
    };
  }
  saveToFile() {
    const data = {
      students: this.students.map((student) => ({
        id: student.id,
        name: student.name,
        studentClass: student.studentClass,
        subjectScore: student.subjectScore.map((subject) => ({
          subject: subject.subject,
          scoreNumber: subject.scoreNumber,
        })),
      })),
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  }

  loadFile() {
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
    console.log('data', data);
    if (!data) return console.log('Data tidak ditemukan!');
    this.students = data.students.map((student) => {
      const newStudent = new Student(
        student.id,
        student.name,
        student.studentClass
      );
      student.subjectScore.forEach((subject) => {
        newStudent.addGrade(subject.subject, subject.scoreNumber);
      });
      return newStudent;
    });
  }
}

export default StudentManager;
