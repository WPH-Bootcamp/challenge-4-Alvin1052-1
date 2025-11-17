import readlineSync from 'readline-sync';
function max() {
  const subject = [
    { mapel: 'Matematika', nilai: 80 },
    { mapel: 'Bahasa Indonesia', nilai: 90 },
    { mapel: 'IPA', nilai: 88 },
  ];

  const totalNilai = subject.reduce(
    (total, pelajaran) => total + pelajaran.nilai,
    0
  );
  const rataNilai = totalNilai / subject.length;
  console.log(`Rata-rata Nilai: ${rataNilai}`);
}

max();
