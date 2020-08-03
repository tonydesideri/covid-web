const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');
const mailConfig = require('./config/mail');

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/css'));
app.use(bodyParser.json());      
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 80,() => {
    console.log(`Rodando ${process.env.PORT || 80}`);
});

async function sendMail(matricula, radioTipo, identificacao, empresa, c3, c5, c6, c7) {
    const { host, port, secure, auth, service } = mailConfig;

    this.transporter = nodemailer.createTransport({
      service,
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    if (radioTipo == 'colaborador') {
      await transporter.sendMail({
        from: "tony.desideri@grupoicts.com.br",
        to: "iza_travassus@denso.com.br, diego_damasceno@denso.com.br, dayana_carvalho@denso.com.br, kazumi_eto@denso.com.br", 
        subject: "Alerta intrevista COVID-19 #XôCorona",
        text: `Olá, este email está sendo enviado quando no formulário na entrevista da COVID-19 é preenchido a resposta "sim" para a pergunta se a pessoa 
        teve sintomas de COVID-19 nos ultimos 5 dias, ou se teve febre ou falta de ar ou falta de paladar ou olfato. \n Por favor não responda este email. \n
        
        O colaborador com a matricula ${matricula} teve as seguintes respostas: \n
  
        Você teve um ou mais dos sintomas abaixo nos últimos 5 dias?\n
        Febre: ${c3 == 'on' ? 'Sim' : 'Não'}\n
        Dificuldade para respirar: ${c5 == 'on' ? 'Sim' : 'Não'}\n
        Perda de olfato: ${c6 == 'on' ? 'Sim' : 'Não'}\n
        Alteração do paladar: ${c7 == 'on' ? 'Sim' : 'Não'}\n
        `,
      });
    } else {
      await transporter.sendMail({
        from: "tony.desideri@grupoicts.com.br",
        to: "iza_travassus@denso.com.br, diego_damasceno@denso.com.br, dayana_carvalho@denso.com.br, kazumi_eto@denso.com.br", 
        subject: "Alerta intrevista COVID-19 #XôCorona",
        text: `Olá, este email está sendo enviado quando no formulário na entrevista da COVID-19 é preenchido a resposta "sim" para a pergunta se a pessoa 
        teve sintomas de COVID-19 nos ultimos 5 dias, ou se teve febre ou falta de ar ou falta de paladar ou olfato. \n Por favor não responda este email. \n
        
        O visitante com a identificação: ${identificacao} da empresa: ${empresa} teve as seguintes respostas: \n
  
        Você teve um ou mais dos sintomas abaixo nos últimos 5 dias?\n
        Febre: ${c3 == 'on' ? 'Sim' : 'Não'}\n
        Dificuldade para respirar: ${c5 == 'on' ? 'Sim' : 'Não'}\n
        Perda de olfato: ${c6 == 'on' ? 'Sim' : 'Não'}\n
        Alteração do paladar: ${c7 == 'on' ? 'Sim' : 'Não'}\n
        `,
      });
    }
    
    
}

app.get('/', (req, res) => {
    fs.createReadStream(path.join(__dirname, 'views', 'auto.html'))
    .pipe(res); 
})

app.get('/login', (req, res) => {
    fs.createReadStream(path.join(__dirname, 'views', 'login.html'))
    .pipe(res); 
})

app.post('/registros', (req, res) => {
      if (req.body.senha == 'TuWztyqQbrSHb89Nc6LC6P4H') {
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
    } else {
      res.send("Senha inválida!");
    }
});

app.post('/registrar', (req, res) => {
    const matriculasValidas = ['12121','12122','12123','12124','12125','12126','12127','12128','12129','12130','10061','10095','10108','10125','10134','10162','10181','10187','10231','10254','10314','10321','10381','10441','10488','10495','10509','10556','10557','10569','10661','10687','10699','10709','10713','10801','10855','10876','10884','10893','10933','10937','10941','10956','10985','11007','11022','11038','11055','11057','11071','11097','11106','11130','11151','11158','11167','11168','11173','11178','11179','11182','11183','11188','11192','11207','11224','11227','11228','11230','11233','11256','11260','11263','11272','11276','11311','11313','11323','11331','11342','11343','11348','11375','11379','11383','11390','11409','11424','11459','11466','11478','11479','11485','11497','11500','11511','11512','11517','11527','11540','11546','11547','11561','11572','11581','11587','11592','11595','11602','11635','11637','11641','11642','11645','11646','11651','11652','11656','11657','11664','11666','11670','11671','11674','11677','11681','11683','11693','11697','11722','11723','11726','11734','11736','11737','11739','11746','11750','11756','11766','11767','11791','11793','11800','11801','11805','11806','11807','11809','11817','11820','11823','11828','11836','11837','11842','11843','11844','11846','11848','11853','11855','11856','11858','11871','11874','11876','11880','11882','11884','11888','11890','11892','11894','11895','11898','11899','11900','11901','11903','11907','11908','11909','11914','11915','11917','11918','11923','11925','11926','11931','11932','11936','11937','11941','11942','11944','11947','11948','11952','11958','11959','11962','11966','11967','11968','11970','11971','11975','11979','11981','11982','11984','11985','11986','11987','11988','11989','11990','11991','11992','11994','11997','11999','12000','12005','12006','12009','12010','12011','12013','12014','12016','12017','12018','12020','12021','12022','12023','12025','12026','12027','12028','12029','12030','12031','12032','12033','12035','12036','12037','12039','12041','12042','12043','12044','12046','12050','12051','12053','12054','12055','12056','12058','12059','12060','12062','12063','12066','12067','12068','12071','12072','12073','12076','12077','12078','12080','12083','12084','12085','12086','12088','12090','12091','12093','12094','12095','12096','12097','12098','12099','12100','12101','12102','12103','12104','12105','12106','12107','12108','12109','12110','12111','12112','12113','12114','12115','12116','12117','12118','12119','12120','12121','12122','12123','12124','12125','12126','12127','16024','16107','16110','16112','16113','16115','16116','16117','16119','16120','16121','16122','16123','16125','16126','17059','17063','17074','17075','17083','17088','17089','17090','17095','17096','17097','17098','17100','17104','17105','17106','17107','19020','19022','19023','19024','19025'];
    console.log(req.body);
    var { matricula, radioTipo } = req.body;
    
    if(radioTipo === 'colaborador' && matricula ) {
      if (!matriculasValidas.find(item => item === matricula)) {
        res.sendFile(path.join(__dirname, 'views', 'ng.html'));
      }
    }

        var { empresa, identificacao } = req.body;
        var { c1 } = req.body;
        var { c2 } = req.body;
        var { c3 } = req.body;
        var { c4 } = req.body;
        var { c5 } = req.body;
        var { c6 } = req.body;
        var { c7 } = req.body;
        var { c8 } = req.body;
        var { assinatura } = req.body;
        if (c1 == undefined) {c1="off"};
        if (c2 == undefined) {c2="off"};
        if (c3 == undefined) {c3="off"};
        if (c4 == undefined) {c4="off"};
        if (c5 == undefined) {c5="off"};
        if (c6 == undefined) {c6="off"};
        if (c7 == undefined) {c7="off"};
        if (c8 == undefined) {c8="off"}; 
        
        // //Enviar email
        if (c3 === 'on' || c5 === 'on' || c6 === 'on' || c7 === 'on' ) {
          sendMail(matricula, radioTipo, identificacao, empresa, c3, c5, c6, c7);
        }

        // Função para formatar 1 em 01
        const zeroFill = n => {
            return ('0' + n).slice(-2);
        }
        // Pega o horário atual
        const now = new Date();
        const tz = now.getTimezoneOffset();
        // Formata a data conforme dd/mm/aaaa hh:ii:ss
        const dataHora = zeroFill(now.getDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
        var reg = '';
        reg = `;${c1};${c2};${c3};${c4};${c5};${c6};${c7};${c8};${assinatura}`;
        reg = reg.split(';on').join(';sim');
        reg = reg.split(';off').join(';nao');
        reg = `${tz};${dataHora};${radioTipo};${matricula};${empresa || "DENSO"};${identificacao}${reg};<br>\n`
        console.log(reg);
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';empresa;' + empresa + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';identificacao;' + identificacao + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q1;' + c1 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q2;' + c2 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q3;' + c3 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q4;' + c4 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q5;' + c5 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q6;' + c6 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q7;' + c7 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q8;' + c8 + ';<br>' + '\n';
        // reg = reg + tz + ";" + dataHora + ';' + matricula + ';q9;' + assinatura + ';<br>' + '\n';
        
        nomeArq = "data/"+now.getFullYear()+zeroFill((now.getMonth() + 1))+zeroFill(now.getUTCDate())+".txt";
        fs.appendFile(nomeArq, reg, function (err) {
            if (err) throw err;
            //console.log('Updated!');
        });

        if (c3 === 'on' || c5 === 'on' || c6 === 'on' || c7 === 'on' ) {
          res.sendFile(path.join(__dirname, 'views', 'alert.html'));
        } else {
          res.sendFile(path.join(__dirname, 'views', 'ok.html'));
        }


})

