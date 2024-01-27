const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use('/images', express.static(path.join(__dirname, 'public')));

const products = [
    {
        id: 1,
        name: 'RTX 3060 TI 12Gb',
        image: 'product-image3.jpeg',
        price: 15000,
        length: 25,
        width: 10,
        category: 'Graphics card',
        status: 'in-stock',
        description: 'The GeForce RTX 3060 Ti is a high-end graphics card by NVIDIA, launched on December 1st, 2020. Built on the 8 nm process, and based on the GA104 graphics processor, in its GA104-200-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 3060 Ti.'
    },
    {
        id: 2,
        name: 'RTX 4090 24Gb',
        image: 'product-image2.jpeg',
        price: 50000,
        length: 30,
        width: 10,
        category: 'Graphics card',
        status: 'in-stock',
        description: 'The GeForce RTX 4090 is an enthusiast-class graphics card by NVIDIA, launched on September 20th, 2022. Built on the 5 nm process, and based on the AD102 graphics processor, in its AD102-300-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 4090.'
    },
    {
        id: 3,
        name: 'RTX 4060 TI 8Gb',
        image: 'product-image3.jpeg',
        price: 20000,
        length: 25,
        width: 7,
        category: 'Graphics card',
        status: 'sold-out',
        description: 'The GeForce RTX 4060 Ti 8 GB is a high-end graphics card by NVIDIA, launched on May 18th, 2023. Built on the 5 nm process, and based on the AD106 graphics processor, in its AD106-350-A1 variant, the card supports DirectX 12 Ultimate. This ensures that all modern games will run on GeForce RTX 4060 Ti 8 GB.'
    },
    {
        id: 4,
        name: 'AMD Ryzen 9 5900x',
        image: 'product-image.png',
        price: 8000,
        length: 5,
        width: 5,
        category: 'Processor',
        status: 'in-stock',
        description: 'Ryzen 5 (pronounced Rye-Zen Five) is a family of mid-range performance 64-bit quad and hexa-cores x86 microprocessors introduced by AMD in March of 2017. Ryzen 5 is based on the Zen microarchitecture and is manufactured on GF\'s 14 nm process. Ryzen 5 is marketed toward the mid-range performance market.'
    },
    {
        id: 5,
        name: 'HyperX FURY DDR4 8Gb',
        image: 'product-image5.jpg',
        price: 4500,
        length: 10,
        width: 4,
        category: 'RAM',
        status: 'in-stock',
        description: 'HyperX® FURY DDR4 provides a powerful performance boost for gaming, video editing, and rendering with speeds up to 3733MHz. This cost-effective upgrade is available in 2400MHz–3733MHz speeds, CL15–19 latencies, single module capacities of 4GB–32GB, and kit capacities of 16GB–128GB.'
    },
    {
        id: 6,
        name: 'Kingston DDR4 8Gb',
        image: 'product-image5.jpg',
        price: 2000,
        length: 10,
        width: 4,
        category: 'RAM',
        status: 'in-stock',
        description: 'Kingston Technology Corporation is an American multinational computer technology corporation that develops, manufactures, sells and supports flash memory products, other computer-related memory products, as well as the HyperX gaming division (now owned by HP).'
    },
    {
        id: 7,
        name: 'B450 TUF Gaming',
        image: 'product-image4.webp',
        price: 3000,
        length: 25,
        width: 20,
        category: 'Motherboard',
        status: 'sold-out',
        description: 'The TUF B450-Plus Gaming AM4 ATX Motherboard from Asus is built on the AMD B450 chipset, supporting first- and second-generation Ryzen processors with an AM4 socket. It has four memory slots, which support up to 64GB of DDR4 RAM at speeds of up to 3200 MHz when overclocked.'
    },
    {
        id: 8,
        name: 'ASUS Rog Strix B550-A Gaming',
        image: 'product-image4.webp',
        price: 5000,
        length: 25,
        width: 20,
        category: 'Motherboard',
        status: 'sold-out',
        description: 'ROG Strix B550-A Gaming features two M. 2 slots, one of which supports the latest PCIe 4.0 standard to provide maximum storage flexibility and the fastest data speeds available via the 3rd Gen AMD Ryzen platform. Both M. 2 slots support up to the type 22110 socket and NVM Express RAID for a performance boost.'
    }
]

app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);

    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});