import fs from 'fs';

export const logger = (req, res, next) => {

    const { method, originalUrl, protocol, ip, socket } = req;
    const { localPort, remoteAddress, remotePort } = socket;
    const currentTime = new Date(Date.now()).toLocaleString();

    let log = currentTime + ' | ' + method + ' | ' + originalUrl
        + ' | ' + protocol + ' | ' + ip + ' | ' + localPort
        + ' | ' + remoteAddress + ' | ' + remotePort + '\n';

    // fs.appendFile("log.txt", log,
    //     err => { if (err) console.log("log append error : ", err) });

    console.log(currentTime,
        '|', method,
        '|', originalUrl,
        '|', protocol,
        '|', ip,
        '|', localPort,
        '|', remoteAddress,
        '|', remotePort,
    );

    next();
}