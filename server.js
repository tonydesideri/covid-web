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
      if (req.body.senha == 'c0viD@2020!') {
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
    const matriculasValidas = ['10801','12010','11915','11992','11739','12104','11681','11527','12103','11158','11540','12093','12031','11909','11991','11331','11823','11837','11179','12054','11657','11874','11656','10509','10699','10441','11272','11602','10985','11986','11931','12009','10181','12096','10108','11888','11975','11990','11914','11828','11500','10884','12014','12026','11871','12097','11130','11846','11151','11908','11055','11677','11985','11693','11890','11858','10713','11737','11948','11947','11750','11635','11642','11409','10661','11989','11736','11984','12030','12048','11233','11646','11903','11547','11856','11994','11022','11746','11982','11925','11807','11766','11348','12041','11485','11882','11168','12058','12029','11645','10855','11988','11853','12091','11479','12110','12025','11937','11876','11767','10956','11512','11895','12066','12046','12013','11183','11970','11971','10162','11855','10933','12085','11323','11981','11894','11038','11511','11178','11592','10941','12067','11674','11734','11958','12084','12109','11478','12044','11892','11805','11641','10495','11173','12039','12095','11071','11424','11097','12108','11276','10125','11546','11207','12083','11263','11959','12094','10321','11697','12090','12102','12073','10061','10709','10556','11722','12072','11182','12071','11383','12043','12028','11595','11952','10187','10381','11230','12056','11944','12036','11932','11926','10557','11917','10314','12080','11901','11843','12101','11228','11227','10254','11907','11793','10893','11997','10876','11936','11880','12053','11820','11918','12023','11057','12022','10569','11999','11256','11561','11842','11572','12006','11587','11966','11817','12037','12011','11723','11637','11968','12055','11390','12068','11167','11836','10488','11343','12063','12100','11967','11379','11666','11962','11459','11466','11671','12018','11313','11188','12035','12042','12000','11007','11726','11900','11517','12099','11923','11683','11311','11581','11224','11899','11652','12017','11791','11848','11801','11375','12051','11844','12088','12098','11884','11806','10134','11898','11651','11987','12060','11756','12107','11664','12005','11809','11941','11260','10687','12050','12027','10937','12106','12021','11192','11942','11670','12086','11342','12105','12078','12033','12032','12016','10095','11106','12020','11800','11497','10231','11979'];
    console.log(req.body);
    var { matricula, radioTipo } = req.body;
    
    if(radioTipo == 'colaborador') {
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
        
        //Enviar email
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
        const dataHora = zeroFill(now.getUTCDate()) + '/' + zeroFill((now.getMonth() + 1)) + '/' + now.getFullYear() + ' ' + zeroFill(now.getHours()) + ':' + zeroFill(now.getMinutes()) + ':' + zeroFill(now.getSeconds());
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

