const fs = require('fs');
const http = require('http');
const url = require('url');

//요청 url의 pathname을 보고 라우팅을 분리
const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const pathName = urlObj.pathname;

    if (pathName === '/') {
        //Read : fs.readdir로 목록 조회 + fs.readFile로 해당 파일의 내용 조회
        fs.readdir(`./data`, 'utf8', (err, files) => {
            if (err) throw err;
            //파일 별 내용 출력
            fs.readFile(`./data/ironman.txt`, 'utf8', (err2, data) => {
                if (err2) throw err2;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(files);
                console.log(data);
                res.end("READ");
            });
            fs.readFile(`./data/superman.txt`, 'utf8', (err3, data) => {
                if (err3) throw err3;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(data);
                res.end("READ");
            });
            fs.readFile(`./data/superwoman.txt`, 'utf8', (err4, data) => {
                if (err4) throw err4;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(data);
                res.end("READ");
            });
            fs.readFile(`./data/hulk.txt`, 'utf8', (err5, data) => {
                if (err5) { //아직 hulk가 생성이 안 됐다면
                    console.log("")
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    console.log(data);
                    res.end("READ");
                }
            });
        });

    } else if (pathName === '/create') {
        //사용자에게 데이터를 입력받아야 하는 부분이지만
        //hulk.txt 파일을 생성하도록 지정
        fs.writeFile(`./data/hulk.txt`, "헐크", 'utf8', () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("CREATE hulk.txt");
        });
        //생성 후 파일 목록들을 보여줌
        console.log("=====생성 후 파일 목록=====")
        fs.readdir(`./data`, 'utf8', (err, files) => {
            if (err) throw err;
            fs.readFile(`./data/ironman.txt`, 'utf8', (err2, data) => {
                if (err) throw err;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                console.log(files);
                console.log("CREATE hulk.txt")
                res.end("CREATE");
            });
        });
    } else if (pathName === '/update') {
        //Update form
        //어느 파일을 어떻게 수정할 지 입력을 받아야 하지만,
        //헐크 파일을 수정하도록 지정
        fs.appendFile('./data/hulk.txt', "\n헐크를 수정합니다.", () => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("UPDATE");
        });
        console.log("=====수정된 내용=====")
        //수정된 내용을 콘솔에 출력
        fs.readFile(`./data/hulk.txt`, 'utf8', (err2, data) => {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            console.log(data);
        });
    } else if (pathName === '/delete') {
        //Delete
        //어느 파일을 삭제할 지 입력을 받아야 하지만,
        //헐크 파일이 삭제되도록 지정
        console.log("=====파일 삭제=====")
        fs.unlink(`./data/hulk.txt`, () => {
            res.writeHead(302, { Location: `/` });
            console.log("DELETE hulk.txt")
            res.end("DELETE");
        })
    } else {
        //없는 경로에 접근
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end("Sorry! Wrong path. <a href='/'>Go home</a>");
    }
});
server.listen(8010);

server.on('listening', () => {
    console.log('8010번 포트에서 서버 대기중');
});
server.on('error', (error) => {
    console.error(error);
});