import banner1 from '../../../public/banner1.jpeg';
import banner2 from '../../../public/banner2.jpeg';
import banner3 from '../../../public/banner3.jpeg';

import mens_clothing from '../../../public/mens_clothing.jpg'
import jewelry from '../../../public/jewelry.jpg'
import womens_clothing from '../../../public/womens_clothing.jpg'
import electronics from '../../../public/electronics.jpg'

export const carouselData = [banner1, banner2, banner3];

export const categoryCardData = [
    {
        id: 1,
        title: 'Men\'s Clothing',
        description: 'Step into style and elevate your wardrobe with our exclusive men\'s clothing collection. From timeless classics to trend-setting pieces, our range is crafted to fit every occasion and lifestyle. Whether you\'re looking to impress at the office, relax on the weekends, or make a statement at your next event, we’ve got you covered.',
        image: mens_clothing
    },
    {
        id: 2,
        title: 'Jewelery',
        description: 'Unlock elegance and sparkle with our stunning jewelry collection. Every piece is a masterpiece, designed to add a touch of glamour and sophistication to any look. From timeless necklaces and dazzling earrings to luxurious rings and bracelets, our jewelry speaks to those who appreciate beauty, quality, and craftsmanship.',
        image: jewelry
    },
    {
        id:3,
        title: 'Women\'s Clothing',
        description: 'Refresh your wardrobe with our captivating collection of women\'s clothing! From effortlessly chic dresses to versatile tops and cozy knits, each piece is designed to celebrate your unique style and confidence. Crafted with care and attention to detail, our collection offers luxurious fabrics, flattering cuts, and the latest trends to keep you looking and feeling fabulous.',
        image: womens_clothing
    },

    {
        id: 4,
        title: 'Electronics',
        description: 'Experience the future with our cutting-edge electronics! Whether you\'re a tech enthusiast, a gamer, or just looking for the latest gadgets to enhance your lifestyle, we have something for everyone. From high-performance laptops and crystal-clear TVs to smart home devices and the latest accessories, our collection brings you the best in innovation and quality.',
        image: electronics
    }
]