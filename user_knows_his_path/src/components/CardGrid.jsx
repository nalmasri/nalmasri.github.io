import React, { useEffect, useRef, useState } from 'react';
import Card from './Card';
import CompassWrap from './CompassWrap';
import { PROGRAMS } from '../constants/programs';

const CARDS_DATA = [
  // Column 1
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني ميكاترونكس',
    description: 'هندسة الميكاترونكس الصناعية المتقدمة',
    icon: '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',
    iconClass: 'ic-orange',
  },
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني أتمتة',
    description: 'هندسة الميكاترونكس الصناعية المتقدمة',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE00lEQVR4nO2aWWhdVRSGP6xJixm01qoYW4fYwRSxILGtig8VfFD0QWlFELHUJ/tisaDUAaR1qm2ijU8OLxWHN4cHp6JWwfqirVAFFa1DakUQ1CQ114yy4D+wPDl373PPec+7/3g8bjnrrX22mfvvdb61r5QPpqBVmA5cDQNjGOBDv39CUyjQTFFk/jDTegJoBcNhpvl/NXAVcC/+rwRGE0D4X05foI+jwG+1DOb1HQaAC3ALuAnYD/3vA/wgttqdwJN1DGuk6MPZHx/DfCfZOYDPahDNANfycmxFeQmAX9JbgXQjzrD5XLurQTZE4FfJG+TP4o6QU/gBzk2PlHHkuUX0vkWGEQd4F459EpOvf7AR25lDmcf4lRFqm3AsCr0+wJrXa45tAY+JjnxjZyYXcDOALfN1imMdxksTyzW4ItKsHck8L3sLVMU7BLcpUE3lRhCjwF+k12zX3NcpsF2AGdGZC3p3QGcnmj7XKAd2A1cRA1xGrBdE5mRIH+WZLfncOw2RwOOowYYDGzWIPcn6ox0NZZFt5mJ52+ZdFbuUbcVxoEuTC7JcRh7u4l0aMvMSswxm6VjdKAU2Bt5WUY3qJrNgzbpLtf/ncDEHGXP78AhlBih2qrk4aulP0a1WGCQIyJ6TY7fPE1BTNJ2sLc4rkobr8mZM7TV1rjV7R7RHa3S33wYVSTjbtGgxjWqxauycaE+D3Wcfm6C/pOSnVetA/Pc4S7C6MKKXOCeXaJnVqMNSViVDq1M7sJyopSNBB1BMSyRrcl7PF+q588l2HhHstbcyIWPpXg9xREO7Li99MB26U3H+MgUd65yHXBT+jGBV/fSpN8AumXIhHwwqMJqxc5KT9daGp44j06CZApzEmQfcslub4XecH23JeOcTdX3RrBieFOyVybIdnKBHQq3LQncOxR42zKy9q0a/NkMG721tWy8AyLj3SBbFsWimCZhC5kxhG3xFHCOnLHJ3KeXcJLrmFgOycK6hO6LYYKrv6J4UMI2+0oY5sqNgXp2qVbT11ah95uSZ85LLECNA0XxQUaEyerxWqPNw97qQh3wz3WIYwXmAtmamkCtQ+6JInBwo56VEMpsS2xFsUi2zo/IdXeELoqtEj4oIved5Mq4zGl1RWWsZDK5n0lA6M3uH5EL3Lpo1g/5wRKjcZ5KOF5jrk8xHIq5GOcI7RszXgRny86qBNmQ3W1bR7Ex0cH5JVTFhmdk56YE2bsle3uK4RclHLv7u9i1OmOJLAsDta3aE3u/KxLDdCfmuCRXCc2ub/so1eGxHDxjsCZs3ZiDU4wPVXbeqvIhlqD+cZPpkbNn3K7gYo25GG7ROM/nGIO3pXRtguwEN5nWhGgXsN5dw5FQYW+SvFXmuUlVm9oyMRiX/kT3HDEOHrBSkSplFW+UP2uq6XGF+mdxjh5WqY00YYg6jrlXI+Aw4FcZeHwf3cJ2Az6UD68XMXSKexuPVGCAtUCTXmAoSQpfAI13FHNVF11cNgEPuwIx9V4yipOBr2X4b+CeGl6RtbjzudP1wkpDH9HV3RrEQu5LwBXKJ7FqOQYL27P0q4kO5bFYWV8IY9XQDhPyf+8VsBuqhNCI6LK7d6uN7BdAFp4/VVB4t4A9yyufiS7nDuP/Ayz9fDI+0tWLAAAAAElFTkSuQmCC',
    iconClass: 'ic-blue',
  },
  {
    col: 1,
    program: 'هندسة الميكاترونكس الصناعية المتقدمة',
    title: 'فني صيانة متقدمة',
    description: 'هندسة الميكاترونكس الصناعية المتقدمة',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABYUlEQVR4nO2YPU7DQBCFHwWCDk4RbkBNwY8UwQFyAsIJEBeAE0CRAxCFC0AXCUp6qIDG6aChwxKzaKURSjZ21vFKzgvMJ71mZtf7nr2yrQUMw5iXIwAZAEeqDMBhlSAjArMuIu8xyreKFVFFsSANIRaEDLEgZIgFIUMsCBliQcgQC0KGWBAyxIKQIRaEDLEgZIgFWdYgLwQniS4i73EmqwA+CIy6iN7VaykHOrAX1Lta76M5+rrmcVDvaX1v1uQrHdQuuagP1BRdXfM6qLe1flk2cUWP7D8BrBOd0I8CL2vqMVPPU2zrxJuC3sMCg9wX+Bloz3ue4kKbHfDTUa/nRc1nADmAzcRFdircZT8mhQ0AXwCewkZLF7hFOsMKQfyYVO70WlvjxbMFvJVSOVHPp+PFR4KPXF1577/kBIbqKg+DTBSWhPzPBnkl2CJ1NfEnvA/gjcCUm1P+Aew2vg+M/8QPcrREFkSbBNoAAAAASUVORK5CYII=',
    iconClass: 'ic-blue',
  },
  {
    col: 1,
    program: 'تشكيل المعادن والتصنيع المتقدم',
    title: 'فني تصنيع',
    description: 'تشكيل المعادن والتصنيع المتقدم',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAACIUlEQVR4nO2ZTU4CQRCF3wbiGfAn8SJs2HgbE13o0ru4kBhZeQMncwIXJHALJC4pN0VCJiDNFNBVPe9LZsEMr6A/p3uqBSCEEEKCUAOocn+JyFQAvozSD33deaqG9ENfFyu0PtPA2tz1IagyDYx3pJHO3JE1Hx55Hx4pULqRYqczIeUgxqPzCAXaaCuCAhUKNEKBRijQCAUa2SYiZV9Ngco2ESn7agpUOIWNUGDJAq8AvAP4BHDrNO9SYA/APYCfjQ/6BfAC4MJZ3p3AOwAzLb4C8KrHSs/N9T3/5ecnzM8aeTdtzA2AyUbhbwDDjetDPbe+PtFMrvwHgGsPbUwfwDOApRZcAHjUadSkp9cW+t6lZs+Zf2jks0/h6UaxNwCDhMwlgPGW/62N9dqp8wP9ruJB4LrQqEV2pH+Aaea8C4GWJaCfOf8UWWBU3AisjT9e58q7EVgZf7w+Rf6sfWCJU7g6Zx9YosAU3AisuQZuLyQ7jtQ1LHc+jMBd5M6n1j9ZIWmcbysgV/7Q+kcvJIkD2LUG5cy7aGMkcQD71rAceRdtjHAK2woJHyK2QpI4gH1rWK58doGR98KhBEaFAksRWDvcC7vqAyXgXthVHyhsY9oVEjbStkISeC8cSmDlcC8cSuAucucPrX/0QsKHiK2QBN4Lu+gDI++FXfSBpUOBpQisHe6FQwmsHK6BoQRGhQK9CezqYUY6fhBCCCGEEEJwZP4AUj9q64sCLhQAAAAASUVORK5CYII=',
    iconClass: 'ic-purple',
  },
  {
    col: 1,
    program: 'تشكيل المعادن والتصنيع المتقدم',
    title: 'فني لحام',
    description: 'تشكيل المعادن والتصنيع المتقدم',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEv0lEQVR4nNWaeahVVRTGf6+XomkZPi0pMy210kyUBmhCQ6m0QbL+SYhyKPsnjCIQGigaoImoIIpogEptQMuytCKszCx84ZRNNGdpr5LKUvP5Yj2+DQvx3L3PPec+7/3g8bjnrrX22mfvvdb61r5QPpqBVmA5cDQNjGOBDv39CUyjQTFFk/jDTegJoBcNhpvl/NXAVcC/+rwRGE0D4X05foI+jwG+1DOb1HQaAC3ALuAnYD/3vA/wgttqdwJN1DGuk6MPZHx/DfCfZOYDPahDNANfycmxFeQmAX9JbgXQjzrD5XLurQTZE4FfJG+TP4o6QU/gBzk2PlHHkuUX0vkWGEQd4F459EpOvf7AR25lDmcf4lRFqm3AsCr0+wJrXa45tAY+JjnxjZyYXcDOALfN1imMdxksTyzW4ItKsHck8L3sLVMU7BLcpUE3lRhCjwF+k12zX3NcpsF2AGdGZC3p3QGcnmj7XKAd2A1cRA1xGrBdE5mRIH+WZLfncOw2RwOOowYYDGzWIPcn6ox0NZZFt5mJ52+ZdFbuUbcVxoEuTC7JcRh7u4l0aMvMSswxm6VjdKAU2Bt5WUY3qJrNgzbpLtf/ncDEHGXP78AhlBih2qrk4aulP0a1WGCQIyJ6TY7fPE1BTNJ2sLc4rkobr8mZM7TV1rjV7R7RHa3S33wYVSTjbtGgxjWqxauycaE+D3Wcfm6C/pOSnVetA/Pc4S7C6MKKXOCeXaJnVqMNSViVDq1M7sJyopSNBB1BMSyRrcl7PF+q588l2HhHstbcyIWPpXg9xREO7Li99MB26U3H+MgUd65yHXBT+jGBV/fSpN8AumXIhHwwqMJqxc5KT9daGp44j06CZApzEmQfcslub4XecH23JeOcTdX3RrBieFOyVybIdnKBHQq3LQncOxR42zKy9q0a/NkMG731tWy8AyLj3SBbFsWimCZhC5kxhG3xFHCOnLHJ3KeXcJLrmFgOycK6hO6LYYKrv6J4UMI2+0oY5sqNgXp2qVbT11ah95uSZ85LLECNA0XxQUaEyerxWqPNw97qQh3wz3WIYwXmAtmamkCtQ+6JInBwo56VEMpsS2xFsUi2zo/IdXeELoqtEj4oIved5Mq4zGl1RWWsZDK5n0lA6M3uH5EL3Lpo1g/5wRKjcZ5KOF5jrk8xHIq5GOcI7RszXgRny86qBNmQ3W1bR7Ex0cH5JVTFhmdk56YE2bsle3uK4RclHLv7u9i1OmOJLAsDta3aE3u/KxLDdCfmuCRXCc2ub/so1eGxHDxjsCZs3ZiDU4wPVXbeqvIhlqD+cZPpkbNn3K7gYo25GG7ROM/nGIO3pXRtguwEN5nWhGgXsN5dw5FQYW+SvFXmuUlVm9oyMRiX/kT3HDEOHrBSkSplFW+UP2uq6XGF+mdxjh5WqY00YYg6jrlXI+Aw4FcZeHwf3cJ2Az6UD68XMXSKexuPVGCAtUCTXmAoSQpfAI13FHNVF11cNgEPuwIx9V4yipOBr2X4b+CeGl6RtbjzudP1wkpDH9HV3RrEQu5LwBXKJ7FqOQYL27P0q4kO5bFYWV8IY9XQDhPyf+8VsBuqhNCI6LK7d6uN7BdAFp4/VVB4t4A9yyufiS7nDuP/Ayz9fDI+0tWLAAAAAElFTkSuQmCC',
    iconClass: 'ic-red',
  },
  {
    col: 1,
    program: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    title: 'فني أوتوترونكس',
    description: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    icon: 'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC+ElEQVR4nO2YO2gUURSGPxVjJD4IYpqNReILFawMGIMWFmoXUUIEQe2EWKiFVcpgolglaGOKgGAhEoO4hqCIwZSCoojdmiZKUCPGkEJ8jFz4R67DzjKze2cm4Hxwir1z7zn/mfs6s5CTk5OTk5MdK4B9wCXgJjABvAVKwBeZJ/N/l9RnQmPM2HZgeRYJbAMGgQ+W0FptFhgG2tJIYDUwBPyyBLwDRoDzQCewG2gFNgKNwDJZo9pa1adTY8zY6UBSt4F1SSVhxNxXoJ/AHeCAQ//7gVvAD8V4ltRyO22tdbMvkmIPMKdYJ5II8FzOz5A85xRr0rXjNjn+CNSTPOuBRcXc4dLxsJz2kx4jinnN5Un1FfgNbCY9OpTIJ2CVC4en5PAJ6fNGsbtcOHsqZydJnwuK/TjOoCM6JRbK3LrfgTWkzwbFDupZkNbDwQHHA7d10Ipkx3gFXUbzMbvzSz3oA5rUtlLHrWm/TnbckIZp66ZvklbT/sLu7C+nFqvtqJW5ObV6gC1AQwriGxSrR7F9HYesPi3WMvvLZIXpKzmscKu1UoVn/9z+W4GHZTa6KQ4L2kNjqnT9GzdJW1SsMcUuSEtwwxc1c6FcVGeT3FJhXJrMkRyZV9ZFVAdcDfmI+gaMakarpRm4K19ewN4DA9LQpTajLTK+I1MaXImwFOY0/XHZbpXslaxfWvzfsRNBb8UL+QYpaJ16+tCKyz2NfRDyIjqsmQnqioQ9wF9SO0P6brKO6Lj4yylsNne5TGTIWj7djhOZ11izT4J0W8tusIyuSNgD1qpo89umgIP6wGrWyeZpw8ZlVGOL8lUv31NWvEdWnVdTIqg0OKu/bMI2e8XzPARz2n0O8TmrmPYfEDUn4mPeTC/wWpfWvGaimiR8CjoojK9F+e4NqbadJZI1XrWJ7GXp0F5LIkvVImNv4qxFe2W0xE6k2ufV4rmO65clpkQIKxtm4utMP+5AhKm+7E5/cnHr5NR/Q7bNyJnp45q6jOLm5OTk5Pzn/AGije2jBfuXTQAAAABJRU5ErkJggg=',
    iconClass: 'ic-cyan',
  },
  {
    col: 1,
    program: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    title: 'مستشار خدمة',
    description: 'فني الأوتوترونكس (تكنولوجيا المركبات الهجينة/الكهربائية)',
    icon: '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',
    iconClass: 'ic-yellow',
  },
  {
    col: 1,
    program: 'ميكاترونكس المركبات الهجينة/الكهربائية',
    title: 'فني مركبات كهربائية',
    description: 'ميكاترونكس المركبات الهجينة/الكهربائية',
    icon: '⚡',
    iconClass: 'ic-orange',
  },

  // Column 2
  {
    col: 2,
    program: 'فني الميكانيك وأنظمة الأنابيب الصناعية',
    title: 'فني ميكانيك صناعي',
    description: 'فني الميكانيك وأنظمة الأنابيب الصناعية',
    icon: '🔧',
    iconClass: 'ic-brown',
  },
  {
    col: 2,
    program: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    title: 'فني إنتاج',
    description: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    icon: '⚙️',
    iconClass: 'ic-blue',
  },
  {
    col: 2,
    program: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    title: 'فني صيانة',
    description: 'ميكانيكي تركيب وصيانة الآلات والمعدات الصناعية',
    icon: '🛠️',
    iconClass: 'ic-purple',
  },
  {
    col: 2,
    program: 'إلكتروني تركيب وصيانة الأجهزة الإلكترونية الصناعية',
    title: 'فني إلكترونيات',
    description: 'إلكتروني تركيب وصيانة الأجهزة الإلكترونية الصناعية',
    icon: '📡',
    iconClass: 'ic-teal',
  },
  {
    col: 2,
    program: 'أنظمة التبريد الصناعية',
    title: 'فني تبريد',
    description: 'أنظمة التبريد الصناعية',
    icon: '❄️',
    iconClass: 'ic-pink',
  },
  {
    col: 2,
    program: 'التصميم والتصنيع الرقمي',
    title: 'مشغل CNC',
    description: 'التصميم والتصنيع الرقمي',
    icon: '🖥️',
    iconClass: 'ic-yellow',
  },
  {
    col: 2,
    program: 'التصميم والتصنيع الرقمي',
    title: 'فني تصنيع رقمي',
    description: 'التصميم والتصنيع الرقمي',
    icon: '📐',
    iconClass: 'ic-green',
  },
  {
    col: 2,
    program: 'أنظمة الطاقة المتجددة',
    title: 'فني طاقة',
    description: 'أنظمة الطاقة المتجددة',
    icon: '☀️',
    iconClass: 'ic-green',
  },

  // Column 4
  {
    col: 4,
    program: 'تكنولوجيا إدارة النظم والشبكات',
    title: 'مسؤول شبكات',
    description: 'تكنولوجيا إدارة النظم والشبكات',
    icon: '🌐',
    iconClass: 'ic-blue',
  },
  {
    col: 4,
    program: 'المواد المتقدمة (ألياف الكربون)',
    title: 'فني مواد',
    description: 'المواد المتقدمة (ألياف الكربون)',
    icon: '🛡️',
    iconClass: 'ic-blue',
  },
  {
    col: 4,
    program: 'الأنظمة الكهربائية المتكاملة في المباني الذكية',
    title: 'فني مباني ذكية',
    description: 'الأنظمة الكهربائية المتكاملة في المباني الذكية',
    icon: '🏠',
    iconClass: 'ic-red',
  },
  {
    col: 4,
    program: 'فني أنظمة التكييف والتبريد وأتمتتها',
    title: 'فني HVAC',
    description: 'فني أنظمة التكييف والتبريد وأتمتتها',
    icon: '❄️',
    iconClass: 'ic-red',
  },
  {
    col: 4,
    program: 'تمديدات صحية وتدفئة',
    title: 'سباك',
    description: 'تمديدات صحية وتدفئة',
    icon: '🔧',
    iconClass: 'ic-purple',
  },
  {
    col: 4,
    program: 'كهرباء الشاحنات والحافلات',
    title: 'فني كهرباء مركبات',
    description: 'كهرباء الشاحنات والحافلات',
    icon: '🚌',
    iconClass: 'ic-pink',
  },
  {
    col: 4,
    program: 'ميكانيك الشاحنات والحافلات',
    title: 'فني ميكانيك',
    description: 'ميكانيك الشاحنات والحافلات',
    icon: '🚛',
    iconClass: 'ic-orange',
  },
  {
    col: 4,
    program: 'تكنولوجيا الإنشاءات والهياكل المعدنية',
    title: 'فني إنشاءات',
    description: 'تكنولوجيا الإنشاءات والهياكل المعدنية',
    icon: '🏗️',
    iconClass: 'ic-blue',
  },

  // Column 5
  {
    col: 5,
    program: 'تصميم الأزياء الرقمي (CAD Fashion)',
    title: 'مصمم رقمي',
    description: 'تصميم الأزياء الرقمي (CAD Fashion)',
    icon: '👗',
    iconClass: 'ic-yellow',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Associate Programmer',
    description: 'مطور التطبيقات المتقدمة',
    icon: '💻',
    iconClass: 'ic-red',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'UI/UX',
    description: 'مطور التطبيقات المتقدمة',
    icon: '🎨',
    iconClass: 'ic-purple',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Front-End',
    description: 'مطور التطبيقات المتقدمة',
    icon: '🖼️',
    iconClass: 'ic-orange',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Back-End',
    description: 'مطور التطبيقات المتقدمة',
    icon: '⚙️',
    iconClass: 'ic-blue',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Database',
    description: 'مطور التطبيقات المتقدمة',
    icon: '🗄️',
    iconClass: 'ic-cyan',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Mobile Applications',
    description: 'مطور التطبيقات المتقدمة',
    icon: '📱',
    iconClass: 'ic-teal',
  },
  {
    col: 5,
    program: 'مطور التطبيقات المتقدمة',
    title: 'Software Testing',
    description: 'مطور التطبيقات المتقدمة',
    icon: '✅',
    iconClass: 'ic-green',
  },
];

export default function CardGrid({ selectedCard, onCardSelect, onMouseEnter, onMouseLeave, needleRotation }) {
  const mainGridRef = useRef(null);
  const connectorSvgRef = useRef(null);

  // Group cards by column
  const columns = {
    1: CARDS_DATA.filter(c => c.col === 1),
    2: CARDS_DATA.filter(c => c.col === 2),
    4: CARDS_DATA.filter(c => c.col === 4),
    5: CARDS_DATA.filter(c => c.col === 5),
  };

  useEffect(() => {
    if (window.innerWidth > 1100) {
      drawConnectors();
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1100) {
        drawConnectors();
      } else if (connectorSvgRef.current) {
        connectorSvgRef.current.innerHTML = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const drawConnectors = () => {
    const mainGrid = mainGridRef.current;
    const connectorSvg = connectorSvgRef.current;
    if (!connectorSvg || !mainGrid) return;

    const gridRect = mainGrid.getBoundingClientRect();
    const width = mainGrid.clientWidth;
    const height = mainGrid.scrollHeight;
    const compass = document.querySelector('.compass-wrap');
    if (!compass) return;
    const compassRect = compass.getBoundingClientRect();

    connectorSvg.innerHTML = '';
    connectorSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    connectorSvg.setAttribute('width', width);
    connectorSvg.setAttribute('height', height);
    connectorSvg.setAttribute('preserveAspectRatio', 'none');

    // Add defs for filter
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    filter.setAttribute('id', 'lineGlow');
    filter.setAttribute('x', '-120%');
    filter.setAttribute('y', '-120%');
    filter.setAttribute('width', '340%');
    filter.setAttribute('height', '340%');

    const blur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
    blur.setAttribute('stdDeviation', '1.8');
    blur.setAttribute('result', 'blur');

    const merge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
    const m1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m1.setAttribute('in', 'blur');
    const m2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
    m2.setAttribute('in', 'SourceGraphic');

    merge.appendChild(m1);
    merge.appendChild(m2);
    filter.appendChild(blur);
    filter.appendChild(merge);
    defs.appendChild(filter);
    connectorSvg.appendChild(defs);

    const strokeMap = {
      'ic-red': 'rgba(245, 142, 147, 0.8)',
      'ic-blue': 'rgba(133, 192, 255, 0.8)',
      'ic-green': 'rgba(142, 209, 154, 0.8)',
      'ic-orange': 'rgba(244, 190, 126, 0.8)',
      'ic-purple': 'rgba(199, 164, 240, 0.8)',
      'ic-cyan': 'rgba(139, 223, 221, 0.8)',
      'ic-yellow': 'rgba(232, 209, 108, 0.8)',
      'ic-pink': 'rgba(240, 178, 211, 0.8)',
      'ic-teal': 'rgba(126, 206, 197, 0.8)',
      'ic-brown': 'rgba(205, 167, 126, 0.8)',
    };

//     const cards = mainGrid.querySelectorAll('.card');
//     cards.forEach((card) => {
//       const cardRect = card.getBoundingClientRect();
//       const iconEl = card.querySelector('.card-icon');
//       const iconClass = iconEl
//         ? Array.from(iconEl.classList).find((className) => className.startsWith('ic-'))
//         : null;
//       const x1 = cardRect.left + cardRect.width / 2 - gridRect.left;
//       const y1 = cardRect.top + cardRect.height / 2 - gridRect.top;
//       const x2 = compassRect.left + compassRect.width / 2 - gridRect.left;
//       const y2 = compassRect.top + compassRect.height / 2 - gridRect.top;
//       const dx = x2 - x1;
//       const c1x = x1 + dx * 0.38;
//       const c1y = y1;
//       const c2x = x2 - dx * 0.38;
//       const c2y = y2;

//       const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
//       path.setAttribute('d', `M ${x1} ${y1} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${x2} ${y2}`);
//       path.setAttribute('fill', 'none');
//       path.setAttribute('stroke', strokeMap[iconClass] || 'rgba(156,13,19,0.22)');
//       path.setAttribute('stroke-width', '2');
//       path.setAttribute('stroke-linecap', 'round');
//       path.setAttribute('opacity', '0.7');
//       path.setAttribute('filter', 'url(#lineGlow)');
//       connectorSvg.appendChild(path);
//     });
//   };const cards = mainGrid.querySelectorAll('.card');
const cards = mainGrid.querySelectorAll('.card');

function getCardColumnIndex(card) {
  const col = card.closest('.col');

  if (!col) return -1;

  return Array.from(
    mainGrid.querySelectorAll('.col')
  ).indexOf(col);
}

// =========================
// COMPASS CENTER
// =========================

const compassCenterX =
  compassRect.left +
  compassRect.width / 2 -
  gridRect.left;

const compassCenterY =
  compassRect.top +
  compassRect.height / 2 -
  gridRect.top;

const compassRadius =
  compassRect.width / 2 - 12;

// =========================
// LEFT + RIGHT CARDS
// =========================

const leftCards = [];
const rightCards = [];

cards.forEach((card) => {

  const colIdx = getCardColumnIndex(card);

  // LEFT COLUMN
  if (colIdx === 2) {
    leftCards.push(card);
  }

  // RIGHT COLUMN
  if (colIdx === 1) {
    rightCards.push(card);
  }

});

// =========================
// SORT TOP -> BOTTOM
// VERY IMPORTANT
// =========================

function sortCardsTopToBottom(arr) {

  return arr.sort((a, b) => {

    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return aRect.top - bRect.top;

  });

}

sortCardsTopToBottom(leftCards);
sortCardsTopToBottom(rightCards);

// =========================
// DRAW FUNCTION
// =========================

function drawConnections(cardList, side) {

  const total = cardList.length;

  cardList.forEach((card, index) => {

    const cardRect =
      card.getBoundingClientRect();

    const iconEl =
      card.querySelector('.card-icon');

    const iconClass = iconEl
      ? Array.from(iconEl.classList).find((c) =>
          c.startsWith('ic-')
        )
      : null;

    // =========================
    // CARD START
    // =========================

    let x1;

    if (side === 'left') {

      // start from RIGHT EDGE
      x1 =
        cardRect.right -
        gridRect.left;

    } else {

      // start from LEFT EDGE
      x1 =
        cardRect.left -
        gridRect.left;
    }

    const y1 =
      cardRect.top +
      cardRect.height / 2 -
      gridRect.top;

    // =========================
    // PERFECT ORDERED ANGLES
    // =========================

    let startAngle;
    let endAngle;

    if (side === 'left') {

      // TOP LEFT -> BOTTOM LEFT
      startAngle = 230;
      endAngle = 130;

    } else {

      // TOP RIGHT -> BOTTOM RIGHT
      startAngle = -50;
      endAngle = 50;
    }

    const angle =
      startAngle +
      ((endAngle - startAngle) / (total - 1)) *
        index;

    const rad =
      angle * (Math.PI / 180);

    // =========================
    // COMPASS POINT
    // =========================

    const x2 =
      compassCenterX +
      Math.cos(rad) * compassRadius;

    const y2 =
      compassCenterY +
      Math.sin(rad) * compassRadius;

    // =========================
    // CLEAN CURVE
    // =========================

    const midX = (x1 + x2) / 2;

    const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    path.setAttribute(
      'd',
      `
        M ${x1} ${y1}
        C ${midX} ${y1},
          ${midX} ${y2},
          ${x2} ${y2}
      `
    );

    path.setAttribute('fill', 'none');

    path.setAttribute(
      'stroke',
      strokeMap[iconClass] ||
        'rgba(156,13,19,0.22)'
    );

    path.setAttribute(
      'stroke-width',
      '2.4'
    );

    path.setAttribute(
      'stroke-linecap',
      'round'
    );

    path.setAttribute(
      'stroke-linejoin',
      'round'
    );

    path.setAttribute(
      'opacity',
      '0.92'
    );

    path.setAttribute(
      'filter',
      'url(#lineGlow)'
    );

    connectorSvg.appendChild(path);

    // =========================
    // DOT
    // =========================

    const dot = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'circle'
    );

    dot.setAttribute('cx', x2);
    dot.setAttribute('cy', y2);

    dot.setAttribute('r', '4.5');

    dot.setAttribute(
      'fill',
      strokeMap[iconClass] || '#999'
    );

    dot.setAttribute(
      'stroke',
      'rgba(255,255,255,0.75)'
    );

    dot.setAttribute(
      'stroke-width',
      '1'
    );

    connectorSvg.appendChild(dot);

  });

}

// =========================
// DRAW
// =========================

drawConnections(leftCards, 'left');
drawConnections(rightCards, 'right');

};

  return (
    <div className="main-grid" ref={mainGridRef}>
      <svg
        id="connector-svg"
        ref={connectorSvgRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'visible', zIndex: 4 }}
      ></svg>

      {/* Column 1 */}
      <div className="col">
        {columns[1].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={onCardSelect}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Column 2 */}
      <div className="col">
        {columns[2].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={onCardSelect}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Center Compass */}
      <CompassWrap needleRotation={needleRotation} />

      {/* Column 4 */}
      <div className="col">
        {columns[4].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={onCardSelect}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      {/* Column 5 */}
      <div className="col">
        {columns[5].map((card, idx) => (
          <Card
            key={idx}
            program={card.program}
            title={card.title}
            description={card.description}
            icon={card.icon}
            iconClass={card.iconClass}
            isActive={selectedCard === card.program}
            onCardClick={onCardSelect}
            onMouseEnter={() => onMouseEnter(card)}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>

      <div className="hint" id="hint">
        <p>اضغط على أي بطاقة لعرض <strong>تفاصيل البرنامج التدريبي</strong> كاملاً</p>
      </div>
    </div>
  );
}
