const fs = require('fs');
let css = fs.readFileSync('wordpress-onoff-plugin/assets/css/gangdong-drain-clog.css', 'utf8');

const targetStr = `.ob-drain-mobile-kakao {
  background-color: #FEE500;
  color: #191919;
}`;
const replaceStr = `.ob-drain-mobile-kakao {
  background-color: #FEE500;
  color: #191919;
}

.ob-drain-mobile-contact {
  background-color: #0f172a;
  color: #ffffff;
}`;

css = css.replace(targetStr, replaceStr);

fs.writeFileSync('wordpress-onoff-plugin/assets/css/gangdong-drain-clog.css', css);
console.log('CSS modified');
