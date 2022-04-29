const fs = require('fs');

//디렉토리 생성하기
fs.mkdir("test-fs", (err) => console.log(err));

/* 디렉토리 삭제하기
fs.rmdir("our-fs", (err) => console.log(err));
*/

//파일에 데이터 작성하기 -> writeFile 메소드는 항상 덮어쓰기임
const file = "test.dat";
const data = "테스트";
fs.writeFile(file, data, (err) => console.log(err));

/* 기존 파일에 이어 쓰려면 appendFile 메소드 사용하기
const file = "test.dat";
const data = "추가분";
fs.appendFile(file, data, (err) => console.log(err));
*/

//파일로부터 데이터 읽기
fs.readFile("test.dat", "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });

  //파일이나 디렉토리의 메타 정보 확인하기
  fs.stat("test.dat", (err, stats) => {
    if (err) {
      console.error(err);
    } else {
      console.log({
        size: stats.size,
        mtime: stats.mtime,
        isFile: stats.isFile(),
      });
    }
  });