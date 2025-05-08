import Fonts from './Fonts';
import Colors from './Colors';
import {formatWithMask} from 'react-native-mask-input';
const phoneRegex =
  /^[\+]?[0-9]{0,3}\W?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
const otpError = 'Please enter a valid OTP code.';
const emailError = 'Please enter a valid email.';
const passwordError = 'Password must be at least 8 characters.';
const phoneError = 'Please enter a valid phone number.';
const nameError = 'Please enter a valid name (at least 3 characters).';
const descriptionError = 'Please enter a valid description.';
const imageError = 'Please select an image.';
const androidUrl = `https://play.google.com/store/apps/details?id=com.nexsa`;
const iosUrl = 'https://apps.apple.com/us/app/nexsa/id6742017759';
const message = `You are invited to join nexsa app! Download now!\n${androidUrl}\n${iosUrl}`;
const imagePath = 'logoColored.jpg';

const maskPhoneNumber = val => {
  const {masked} = formatWithMask({
    text: val,
    mask: [
      '(',
      /\d/,
      /\d/,
      /\d/,
      ')',
      ' ',
      /\d/,
      /\d/,
      /\d/,
      '-',
      /\d/,
      /\d/,
      /\d/,
      /\d/,
    ],
  });
  return masked;
};

const formatPhoneNumber = (phone = "") => {
  let phone1 = phone;
  if (phone?.includes('+1')) {
    phone1 = phone?.replace('+1', '');
    phone1 = '+1' + maskPhoneNumber(phone1);
  } else if (phone.length === 11 && phone[0] === '1') {
    phone1 = phone.slice(1);
    phone1 = '1' + maskPhoneNumber(phone1);
  }
  return phone1;
};

export {
  Colors,
  Fonts,
  phoneRegex,
  otpError,
  emailError,
  passwordError,
  phoneError,
  nameError,
  androidUrl,
  iosUrl,
  message,
  descriptionError,
  imageError,
  imagePath,
  maskPhoneNumber,
  formatPhoneNumber
};

