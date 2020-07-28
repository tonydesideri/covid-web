const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const mailConfig = require('./config/mail');

// var transporter = nodemailer.createTransport({
//     service: 'umbler',
//     host: 'smtp.umbler.com',
//     port: 587,
//     secure: false,
//     auth: {
//       user: 'covid@jfcosmeticos.com.br',
//       pass: '!Pa55w.rd!'
//     }
//   });
  
//   var mailOptions = {
//     from: 'covid@jfcosmeticos.com.br',
//     to: 'danieldona@bol.com.br, daniel.dona.82@gmail.com, covid@jfcosmeticos.com.br',
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/css'));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000,() => {
    console.log(`Rodando ${process.env.PORT || 3000}`);
});

async function sendMail(matricula) {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    await transporter.sendMail({
      from: "DENSO <noreply@denso.com.br>",
      to: "tony.desideri@grupoicts.com.br", 
      subject: "COVID",
      text: "COVID",
      html: `<p>O funcionário de matrícula ${matricula}, marcou sim para febre, falta de paladar e falta de ar.<p>`,
    });
}

app.get('/', (req, res) => {
  /*
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
   */
   // res.sendFile(path.join(__dirname, 'views', 'auto.html'));
    fs.createReadStream(path.join(__dirname, 'views', 'teste.html'))
    .pipe(res); 

    

})

app.get('/registros', (req,res) => {
    fs.readdir("./data", (err, paths) => {
        var txt="";
        var arquivos = paths;
        arquivos.forEach(listar_texto);
        
        function listar_texto(value, index, array) {
            try {  
                var data = fs.readFileSync(__dirname + "/data/"+value, 'utf8');
                txt = txt + data.toString();
            } catch(e) {
                txt = 'Error:', e.stack;
                res.send(txt);
            }
        }
        res.send(txt);
      })

})

app.post('/registrar', (req, res) => {
    const matriculasValidas = ['10801','12010','11915','11992','11739','12104','11681','11527','12103','11158','11540','12093','12031','11909','11991','11331','11823','11837','11179','12054','11657','11874','11656','10509','10699','10441','11272','11602','10985','11986','11931','12009','10181','12096','10108','11888','11975','11990','11914','11828','11500','10884','12014','12026','11871','12097','11130','11846','11151','11908','11055','11677','11985','11693','11890','11858','10713','11737','11948','11947','11750','11635','11642','11409','10661','11989','11736','11984','12030','12048','11233','11646','11903','11547','11856','11994','11022','11746','11982','11925','11807','11766','11348','12041','11485','11882','11168','12058','12029','11645','10855','11988','11853','12091','11479','12110','12025','11937','11876','11767','10956','11512','11895','12066','12046','12013','11183','11970','11971','10162','11855','10933','12085','11323','11981','11894','11038','11511','11178','11592','10941','12067','11674','11734','11958','12084','12109','11478','12044','11892','11805','11641','10495','11173','12039','12095','11071','11424','11097','12108','11276','10125','11546','11207','12083','11263','11959','12094','10321','11697','12090','12102','12073','10061','10709','10556','11722','12072','11182','12071','11383','12043','12028','11595','11952','10187','10381','11230','12056','11944','12036','11932','11926','10557','11917','10314','12080','11901','11843','12101','11228','11227','10254','11907','11793','10893','11997','10876','11936','11880','12053','11820','11918','12023','11057','12022','10569','11999','11256','11561','11842','11572','12006','11587','11966','11817','12037','12011','11723','11637','11968','12055','11390','12068','11167','11836','10488','11343','12063','12100','11967','11379','11666','11962','11459','11466','11671','12018','11313','11188','12035','12042','12000','11007','11726','11900','11517','12099','11923','11683','11311','11581','11224','11899','11652','12017','11791','11848','11801','11375','12051','11844','12088','12098','11884','11806','10134','11898','11651','11987','12060','11756','12107','11664','12005','11809','11941','11260','10687','12050','12027','10937','12106','12021','11192','11942','11670','12086','11342','12105','12078','12033','12032','12016','10095','11106','12020','11800','11497','10231','11979'];
    console.log(req.body)
    var { matricula, radioTipo } = req.body;
    
    if(radioTipo == 'colaborador') {
      if (!matriculasValidas.find(item => item === matricula)) {
        res.sendFile(path.join(__dirname, 'views', 'ng.html'));
      }
    }

        var { empresa, identificacao } = req.body;
        var { temperatura } = req.body;
        var { c1 } = req.body;
        var { c2 } = req.body;
        var { c3 } = req.body;
        var { c4 } = req.body;
        var { c5 } = req.body;
        var { c6 } = req.body;
        var { c7 } = req.body;
        var { c8 } = req.body;
        var { c9 } = req.body;
        var { assinatura } = req.body;
        if (c1 == undefined) {c1="off"};
        if (c2 == undefined) {c2="off"};
        if (c3 == undefined) {c3="off"};
        if (c4 == undefined) {c4="off"};
        if (c5 == undefined) {c5="off"};
        if (c6 == undefined) {c6="off"};
        if (c7 == undefined) {c7="off"};
        if (c8 == undefined) {c8="off"}; 
        if (c9 == undefined) {c9="off"}; 
        
        //Enviar email
        if (c2 === 'on' || c4 === 'on' || c5 === 'on') {
          if (matricula) {
            sendMail(matricula);
          } 
        }

        // Função para formatar 1 em 01
        const zeroFill = n => {
            return ('0' + n).slice(-2);
        }
        // Pega o horário atual
        const now = new Date();
        const tz = now.getTimezoneOffset();
        // Formata a data conforme dd/mm/aaaa hh:ii:ss
        const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
        var reg = '';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';empresa;' + empresa + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';identificacao;' + identificacao + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';temperatura;' + temperatura + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q3;' + c1 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q4;' + c2 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q5;' + c3 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q6;' + c4 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q7;' + c5 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q8;' + c6 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q9;' + c7 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q10;' + c8 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q11;' + c9 + ';<br>' + '\n';
        reg = reg + tz + ";" + dataHora + ';' + matricula + ';q12;' + assinatura + ';<br>' + '\n';
//        const reg = reg + tz + ";" + dataHora + ';' + matricula + ';' + radiotxt + ';' + tempo + ';' + c1 + ';' + c2 + ';' + c3 + ';' + c4 + ';' + c5 + ';' + c6 + ';' + c7 + ';' + c8 + ';' + assinatura + '\n'
        
        nomeArq = "data/"+now.getFullYear()+zeroFill((now.getMonth() + 1))+zeroFill(now.getUTCDate())+".txt";
        fs.appendFile(nomeArq, reg, function (err) {
            if (err) throw err;
            //console.log('Updated!');
        });

        if (c2 === 'on' || c4 === 'on' || c5 === 'on') {
          res.sendFile(path.join(__dirname, 'views', 'alert.html'));
        } else {
          res.sendFile(path.join(__dirname, 'views', 'ok.html'));
        }


})

