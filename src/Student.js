/**
 * Class Student
 * Representasi dari seorang siswa dengan data dan nilai-nilainya
 *
 * TODO: Implementasikan class Student dengan:
 * - Constructor untuk inisialisasi properti (id, name, class, grades)
 * - Method addGrade(subject, score) untuk menambah nilai mata pelajaran
 * - Method getAverage() untuk menghitung rata-rata nilai
 * - Method getGradeStatus() untuk menentukan status Lulus/Tidak Lulus
 * - Method displayInfo() untuk menampilkan informasi siswa
 *
 * Kriteria Lulus: rata-rata >= 75
 */

class Student {
  // TODO: Implementasikan constructor
  // Properti yang dibutuhkan:
  // - id: ID unik siswa
  // - name: Nama siswa
  // - class: Kelas siswa
  // - grades: Object untuk menyimpan nilai {subject: score}

  constructor(id, name, studentClass) {
    this.id = id;
    this.name = name;
    this.studentClass = studentClass;
    this.subjectScore = [];

    // GradeBySubject = {
    //   subject: String,
    //   score: Number,

    // };
    // Implementasi constructor di sini
  }

  /**
   * Menambah atau update nilai mata pelajaran
   * @param {string} subject - Nama mata pelajaran
   * @param {number} score - Nilai (0-100)
   * TODO: Validasi bahwa score harus antara 0-100
   */
  addGrade(subject, score) {
    const scoreNumber = Number(score);

    this.subjectScore.push({ subject, scoreNumber });

    // Implementasi method di sini
  }

  /**
   * Menghitung rata-rata nilai dari semua mata pelajaran
   * @returns {number} Rata-rata nilai
   * TODO: Hitung total nilai dibagi jumlah mata pelajaran
   */
  getAverage() {
    const totalScore = this.subjectScore.reduce(
      (total, subject) => total + subject.scoreNumber,
      0
    );

    const totalSubjects = this.subjectScore.length;

    const average = totalScore / totalSubjects;
    return average;
    // Implementasi method di sini
  }

  /**
   * Menentukan status kelulusan siswa
   * @returns {string} "Lulus" atau "Tidak Lulus"
   * TODO: Return "Lulus" jika rata-rata >= 75, selain itu "Tidak Lulus"
   */
  getGradeStatus() {
    // Implementasi method di sini
    if (this.getAverage() >= 75) {
      return 'Lulus';
    } else {
      return 'Tidak Lulus';
    }
  }

  /**
   * Menampilkan informasi lengkap siswa
   * TODO: Tampilkan ID, Nama, Kelas, semua nilai, rata-rata, dan status
   */
  displayInfo() {
    console.log(`ID: ${this.id}`);
    console.log(`Nama: ${this.name}`);
    console.log(`Kelas: ${this.studentClass}`);
    console.log(`Mata pelajaran :`);
    //mata Pelajaran
    if (this.subjectScore.length === 0) {
      console.log(`- Tidak ada nilai!`);
    } else {
      this.subjectScore.forEach(({ subject, scoreNumber }) => {
        console.log(`- ${subject}: ${scoreNumber}`);
      });
    }
    // Rata Rata
    console.log(
      `Rata-rata: ${isNaN(this.getAverage()) ? 0 : this.getAverage()}`
    );
    //Status Lulus / tidak lulus
    console.log(
      `Status: ${this.subjectScore.length > 0 ? this.getGradeStatus() : '-'}`
    );

    // Implementasi method di sini
  }
}

export default Student;
