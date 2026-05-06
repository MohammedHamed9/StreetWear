// product.js:

const products = [
  {
    name: "Classic Oxford Button-Down Shirt",
    description:
      "This classic Oxford shirt is tailored for a polished yet casual look. Crafted from high-quality cotton, it features a button-down collar and a comfortable, slightly relaxed fit. Perfect for both formal and casual occasions, it comes with long sleeves, a button placket, and a yoke at the back. The shirt is finished with a gently rounded hem and adjustable button cuffs.",
    price: 39.99,
    discountPrice: 34.99,
    sku: "OX-SH-001",
    category: "Shirts",
    brand:"Zara",
    fit: "Urban Threads",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    },
     {
      "color": "Gray",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Gray",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Gray",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Gray",
      "size": "XL",
      "stock": 10
    },
     {
      "color": "Gray",
      "size": "XXL",
      "stock": 5
    }
  ],
    collections: "Business Casual",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=39",
        altText: "Classic Oxford Button-Down Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=40",
        altText: "Classic Oxford Button-Down Shirt Back View",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Slim-Fit Stretch Shirt",
    description:
      "A versatile slim-fit shirt perfect for business or evening events. Designed with a fitted silhouette, the added stretch provides maximum comfort throughout the day. Features a crisp turn-down collar, button placket, and adjustable cuffs.",
    price: 29.99,
    discountPrice: 24.99,
    sku: "SLIM-SH-002",
    category: "Shirts",
    brand:"Breshka",
    fit: "Modern Fit",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Gray",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Gray",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Gray",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Gray",
      "size": "XL",
      "stock": 10
    },
    ,
     {
      "color": "Gray",
      "size": "XXL",
      "stock": 5
    }
  ],
    collections: "Formal Wear",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=41",
        altText: "Slim-Fit Stretch Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=42",
        altText: "Slim-Fit Stretch Shirt Back View",
      },
    ],
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Casual Denim Shirt",
    description:
      "This casual denim shirt is made from lightweight cotton denim. It features a regular fit, snap buttons, and a straight hem. With Western-inspiGray details, this shirt is perfect for layering or wearing solo.",
    price: 49.99,
    discountPrice: 44.99,
    sku: "CAS-DEN-003",
    category: "Shirts",
    brand:"Polo",
    fit: "Street Style",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Casual Wear",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=43",
        altText: "Casual Denim Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=44",
        altText: "Casual Denim Shirt Back View",
      },
    ],
    rating: 4.6,
    numReviews: 8,
  },
  {
    name: "Printed Resort Shirt",
    description:
      "Designed for summer, this printed resort shirt is perfect for vacation or weekend getaways. It features a relaxed fit, short sleeves, and a camp collar. The all-over tropical print adds a playful vibe.",
    price: 29.99,
    discountPrice: 22.99,
    sku: "PRNT-RES-004",
    category: "Shirts",
    brand:"Pull&Bear",
    fit: "Beach Breeze",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Vacation Wear",
    material: "Viscose",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=45",
        altText: "Printed Resort Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=1",
        altText: "Printed Resort Shirt Back View",
      },
    ],
    rating: 4.4,
    numReviews: 10,
  },
  {
    name: "Slim-Fit Easy-Iron Shirt",
    description:
      "A slim-fit, easy-iron shirt in woven cotton fabric with a fitted silhouette. Features a turn-down collar, classic button placket, and a yoke at the back. Long sleeves and adjustable button cuffs with a rounded hem.",
    price: 34.99,
    discountPrice: 29.99,
    sku: "SLIM-EIR-005",
    category: "Shirts",
    brand:"Zara",
    fit: "Urban Chic",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Business Wear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=47",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=2",
        altText: "Slim-Fit Easy-Iron Shirt Front View",
      },
    ],
    rating: 5,
    numReviews: 14,
  },
  {
    name: "Polo T-Shirt with Ribbed Collar",
    description:
      "A wardrobe classic, this polo t-shirt features a ribbed collar and cuffs. Made from 100% cotton, it offers breathability and comfort throughout the day. Tailored in a slim fit with a button placket at the neckline.",
    price: 24.99,
    discountPrice: 19.99,
    sku: "POLO-TSH-006",
    category: "T-Shirts",
    brand:"Polo",
    fit: "Polo Classics",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Casual Wear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=3",
        altText: "Polo T-Shirt Front View",
      },
      {
        url: "https://picsum.photos/500/500?random=4",
        altText: "Polo T-Shirt Back View",
      },
    ],
    rating: 4.3,
    numReviews: 22,
  },
  {
    name: "Oversized Graphic T-Shirt",
    description:
      "An oversized graphic t-shirt that combines comfort with street style. Featuring bold prints across the chest, this relaxed fit tee offers a modern vibe, perfect for pairing with jeans or joggers.",
    price: 19.99,
    discountPrice: 15.99,
    sku: "OVS-GRF-007",
    category: "T-Shirts",
    brand:"Breshka",
    fit: "Street Vibes",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Streetwear",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=5",
        altText: "Oversized Graphic T-Shirt Front View",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Regular-Fit Henley Shirt",
    description:
      "A modern take on the classic Henley shirt, this regular-fit style features a buttoned placket and ribbed cuffs. Made from a soft cotton blend with a touch of elastane for stretch.",
    price: 22.99,
    discountPrice: 18.99,
    sku: "REG-HEN-008",
    category: "Shirts",
    brand:"Pull&Bear",
    fit: "Heritage Wear",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Casual Wear",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=6",
        altText: "Regular-Fit Henley Shirt Front View",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Long-Sleeve Thermal Tee",
    description:
      "Stay warm with this long-sleeve thermal tee, made from soft cotton with a waffle-knit texture. Ideal for layering in cooler months, the slim-fit design ensures a snug yet comfortable fit.",
    price: 27.99,
    discountPrice: 22.99,
    sku: "LST-THR-009",
    category: "T-Shirts",
    brand:"Zara",
    fit: "Winter Basics",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Winter Essentials",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=7",
        altText: "Long-Sleeve Thermal Tee Front View",
      },
    ],
    rating: 4.4,
    numReviews: 18,
  },
  {
    name: "V-Neck Classic T-Shirt",
    description:
      "A classic V-neck t-shirt for everyday wear. This regular-fit tee is made from breathable cotton and features a clean, simple design with a flattering V-neckline. Lightweight fabric and soft texture make it perfect for casual looks.",
    price: 14.99,
    discountPrice: 11.99,
    countInStock: 60,
    sku: "VNECK-CLS-010",
    category: "T-Shirts",
    brand:"Pull&Bear",
    fit: "Everyday Comfort",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Basics",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=8",
        altText: "V-Neck Classic T-Shirt Front View",
      },
    ],
    rating: 4.7,
    numReviews: 28,
  },
  {
    name: "Slim Fit Joggers",
    description:
      "Slim-fit joggers with an elasticated drawstring waist. Features ribbed hems and side pockets. Ideal for casual outings or workouts.",
    price: 40,
    discountPrice: 35,
    sku: "BW-001",
    category: "Joggers",
    brand:"Pull&Bear",
    fit: "ActiveWear",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Casual Collection",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=9",
        altText: "Slim Fit Joggers Front View",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: "Cargo Joggers",
    description:
      "Relaxed-fit cargo joggers featuring multiple pockets for functionality. Drawstring waist and cuffed hems for a modern look.",
    price: 45,
    discountPrice: 40,
    sku: "BW-002",
    category: "Joggers",
    brand:"Pull&Bear",
    fit: "UrbanStyle",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Urban Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=10",
        altText: "Cargo Joggers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: "Tapered Sweatpants",
    description:
      "Tapered sweatpants designed for comfort. Elastic waistband with adjustable drawstring, perfect for lounging or athletic activities.",
    price: 35,
    discountPrice: 30,
    sku: "BW-003",
    category: "Sweatpants",
    brand:"Breshka",
    fit: "ChillZone",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Lounge Collection",
    material: "Fleece",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=11",
        altText: "Tapered Sweatpants Front View",
      },
    ],
    rating: 4.3,
    numReviews: 18,
  },
  {
    name: "Denim Jeans",
    description:
      "Classic slim-fit denim jeans with a slight stretch for comfort. Features a zip fly and five-pocket styling for a timeless look.",
    price: 60,
    discountPrice: 50,
    sku: "BW-004",
    category: "Jeans",
    brand:"Zara",
    fit: "DenimCo",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=12",
        altText: "Denim Jeans Front View",
      },
    ],
    rating: 4.6,
    numReviews: 22,
  },
  {
    name: "Chino Pants",
    description:
      "Slim-fit chino pants made from stretch cotton twill. Features a button closure and front and back pockets. Ideal for both casual and semi-formal wear.",
    price: 55,
    discountPrice: 48,
    sku: "BW-005",
    category: "Pants",
    brand:"Zara",
    fit: "CasualLook",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Smart Casual Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=13",
        altText: "Chino Pants Front View",
      },
    ],
    rating: 4.8,
    numReviews: 15,
  },
  {
    name: "Track Pants",
    description:
      "Comfortable track pants with an elasticated waistband and tapered leg. Features side stripes for a sporty look. Ideal for athletic and casual wear.",
    price: 40,
    discountPrice: 35,
    sku: "BW-006",
    category: "Pants",
    brand:"Nike",
    fit: "SportX",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Activewear Collection",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=14",
        altText: "Track Pants Front View",
      },
    ],
    rating: 4.2,
    numReviews: 17,
  },
  {
    name: "Slim Fit Trousers",
    description:
      "Tailored slim-fit trousers with belt loops and a hook-and-eye closure. Suitable for formal occasions or smart-casual wear.",
    price: 65,
    discountPrice: 55,
    sku: "BW-007",
    category: "Pants",
    brand:"Pull&Bear",
    fit: "ExecutiveStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Office Wear",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=15",
        altText: "Slim Fit Trousers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 10,
  },
  {
    name: "Cargo Pants",
    description:
      "Loose-fit cargo pants with multiple utility pockets. Features adjustable ankle cuffs and a drawstring waist for versatility and comfort.",
    price: 50,
    discountPrice: 45,
    sku: "BW-008",
    category: "Pants",
    brand:"Breshka",
    fit: "StreetWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Street Style Collection",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=16",
        altText: "Cargo Pants Front View",
      },
    ],
    rating: 4.5,
    numReviews: 13,
  },
  {
    name: "Relaxed Fit Sweatpants",
    description:
      "Relaxed-fit sweatpants made from soft fleece fabric. Features an elastic waist and adjustable drawstring for a custom fit.",
    price: 35,
    discountPrice: 30,
    sku: "BW-009",
    category: "Sweatpants",
    brand:"Zara",
    fit: "LoungeWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Lounge Collection",
    material: "Fleece",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=17",
        altText: "Relaxed Fit Sweatpants Front View",
      },
    ],
    rating: 4.3,
    numReviews: 14,
  },
  {
    name: "Formal Dress Pants",
    description:
      "Classic formal dress pants with a slim fit. Made from lightweight, wrinkle-resistant fabric for a polished look at the office or formal events.",
    price: 70,
    discountPrice: 60,
    sku: "BW-010",
    category: "Pants",
    brand:"Zara",
    fit: "ElegantStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Formal Collection",
    material: "Polyester",
    gender: "Men",
    images: [
      {
        url: "https://picsum.photos/500/500?random=18",
        altText: "Formal Dress Pants Front View",
      },
    ],
    rating: 4.9,
    numReviews: 8,
  },
  {
    name: "High-Waist Skinny Jeans",
    description:
      "High-waist skinny jeans in stretch denim with a button and zip fly. Features a flattering fit that hugs your curves and enhances your silhouette.",
    price: 50,
    discountPrice: 45,
    sku: "BW-W-001",
    category: "Jeans",
    brand:"Breshka",
    fit: "DenimStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=19",
        altText: "High-Waist Skinny Jeans",
      },
    ],
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: "Wide-Leg Trousers",
    description:
      "Flowy, wide-leg trousers with a high waist and side pockets. Perfect for an elegant look that combines comfort and style.",
    price: 60,
    discountPrice: 55,
    sku: "BW-W-002",
    category: "Pants",
    brand:"Pull&Bear",
    fit: "ElegantWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Formal Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=20",
        altText: "Wide-Leg Trousers Front View",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: "Stretch Leggings",
    description:
      "Soft, stretch leggings in a high-rise style. Perfect for lounging, working out, or casual wear, with a smooth fit that flatters your body.",
    price: 25,
    discountPrice: 20,
    sku: "BW-W-003",
    category: "Leggings",
    brand:"Nike",
    fit: "ComfyFit",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Activewear Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=21",
        altText: "Stretch Leggings Front View",
      },
    ],
    rating: 4.5,
    numReviews: 30,
  },
  {
    name: "Pleated Midi Skirt",
    description:
      "Elegant pleated midi skirt with a high waistband and soft fabric that drapes beautifully. Ideal for both formal and casual occasions.",
    price: 55,
    discountPrice: 50,
    sku: "BW-W-004",
    category: "Skirts",
    brand:"Nike",
    fit: "ChicStyle",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Spring Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=22",
        altText: "Pleated Midi Skirt Front View",
      },
    ],
    rating: 4.6,
    numReviews: 18,
  },
  {
    name: "Flared Palazzo Pants",
    description:
      "High-waist palazzo pants with a loose, flowing fit. Comfortable and stylish, making them perfect for casual outings or beach days.",
    price: 45,
    discountPrice: 40,
    sku: "BW-W-005",
    category: "Pants",
    brand:"Polo",
    fit: "BreezyVibes",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Summer Collection",
    material: "Linen Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=23",
        altText: "Flared Palazzo Pants Front View",
      },
    ],
    rating: 4.4,
    numReviews: 22,
  },
  {
    name: "High-Rise Joggers",
    description:
      "Comfortable high-rise joggers with an elastic waistband and drawstring for a perfect fit. Great for lounging or working out.",
    price: 40,
    discountPrice: 35,
    sku: "BW-W-006",
    category: "Joggers",
    brand:"Breshka",
    fit: "ActiveWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Loungewear Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=24",
        altText: "High-Rise Joggers Front View",
      },
    ],
    rating: 4.3,
    numReviews: 25,
  },
  {
    name: "Paperbag Waist Shorts",
    description:
      "Stylish paperbag waist shorts with a belted waist and wide legs. Perfect for summer outings and keeping cool in style.",
    price: 35,
    discountPrice: 30,
    sku: "BW-W-007",
    category: "Shorts",
    brand:"Pull&Bear",
    fit: "SunnyStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Summer Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=25",
        altText: "Paperbag Waist Shorts Front View",
      },
    ],
    rating: 4.5,
    numReviews: 19,
  },
  {
    name: "Stretch Denim Shorts",
    description:
      "Comfortable stretch denim shorts with a high-waisted fit and raw hem. Perfect for pairing with your favorite tops during warmer months.",
    price: 40,
    discountPrice: 35,
    sku: "BW-W-008",
    category: "Shorts",
    brand:"Breshka",
    fit: "DenimStyle",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Denim Collection",
    material: "Denim",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=26",
        altText: "Stretch Denim Shorts Front View",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },
  {
    name: "Culottes",
    description:
      "Wide-leg culottes with a flattering high waist and cropped length. The perfect blend of comfort and style for any casual occasion.",
    price: 50,
    discountPrice: 45,
    sku: "BW-W-009",
    category: "Culottes",
    brand:"Pull&Bear",
    fit: "ChicStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Casual Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=27",
        altText: "Culottes Front View",
      },
    ],
    rating: 4.6,
    numReviews: 23,
  },
  {
    name: "Classic Pleated Trousers",
    description:
      "Timeless pleated trousers with a tailored fit. A wardrobe essential for workwear or formal occasions.",
    price: 70,
    discountPrice: 65,
    sku: "BW-W-010",
    category: "Pants",
    brand:"Polo",
    fit: "ElegantWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Formal Collection",
    material: "Wool Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=28",
        altText: "Classic Pleated Trousers Front View",
      },
    ],
    rating: 4.8,
    numReviews: 20,
  },
  {
    name: "Knitted Cropped Top",
    description:
      "A stylish knitted cropped top with a flattering fitted silhouette. Perfect for pairing with high-waisted jeans or skirts for a casual look.",
    price: 40,
    discountPrice: 35,
    sku: "TW-W-001",
    category: "Tops",
    brand:"Zara",
    fit: "ChicKnit",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Knits Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=29",
        altText: "Knitted Cropped Top",
      },
    ],
    rating: 4.6,
    numReviews: 15,
  },
  {
    name: "Boho Floral Blouse",
    description:
      "Flowy boho blouse with floral patterns, featuring a relaxed fit and balloon sleeves. Ideal for casual summer days.",
    price: 50,
    discountPrice: 45,
    sku: "TW-W-002",
    category: "Blouses",
    brand:"Pull&Bear",
    fit: "BohoVibes",
    variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Summer Collection",
    material: "Viscose",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=30",
        altText: "Boho Floral Blouse",
      },
    ],
    rating: 4.7,
    numReviews: 20,
  },
  {
    name: "Casual T-Shirt",
    description:
      "A soft, breathable casual t-shirt with a classic fit. Features a round neckline and short sleeves, perfect for everyday wear.",
    price: 25,
    discountPrice: 20,
    sku: "TW-W-003",
    category: "T-Shirts",
    brand:"Breshka",
    fit: "ComfyTees",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Essentials",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=31",
        altText: "Casual T-Shirt",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },
  {
    name: "Off-Shoulder Top",
    description:
      "An elegant off-shoulder top with ruffled sleeves and a flattering fit. Ideal for adding a touch of femininity to your outfit.",
    price: 45,
    discountPrice: 40,
    sku: "TW-W-004",
    category: "Tops",
    brand:"Nike",
    fit: "Elegance",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Evening Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=32",
        altText: "Off-Shoulder Top",
      },
    ],
    rating: 4.7,
    numReviews: 18,
  },
  {
    name: "Lace-Trimmed Cami Top",
    description:
      "A delicate cami top with lace trim and adjustable straps. The lightweight fabric makes it perfect for layering or wearing alone during warmer weather.",
    price: 35,
    discountPrice: 30,
    sku: "TW-W-005",
    category: "Tops",
    brand:"Zara",
    fit: "DelicateWear",
     variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Lingerie-Inspired",
    material: "Silk Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=33",
        altText: "Lace-Trimmed Cami Top",
      },
    ],
    rating: 4.8,
    numReviews: 22,
  },
  {
    name: "Graphic Print Tee",
    description:
      "A trendy graphic print tee with a relaxed fit. Pair it with jeans or skirts for a cool and casual look.",
    price: 30,
    discountPrice: 25,
    sku: "TW-W-006",
    category: "T-Shirts",
    brand:"Pull&Bear",
    fit: "StreetStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Urban Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=34",
        altText: "Graphic Print Tee",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },
  {
    name: "Ribbed Long-Sleeve Top",
    description:
      "A cozy ribbed long-sleeve top that offers comfort and style. Perfect for layering during cooler months.",
    price: 55,
    discountPrice: 50,
    sku: "TW-W-007",
    category: "Tops",
    brand:"Breshka",
    fit: "ComfortFit",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Fall Collection",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=35",
        altText: "Ribbed Long-Sleeve Top",
      },
    ],
    rating: 4.7,
    numReviews: 26,
  },
  {
    name: "Ruffle-Sleeve Blouse",
    description:
      "A lightweight ruffle-sleeve blouse with a flattering fit. Perfect for a feminine touch to any outfit.",
    price: 45,
    discountPrice: 40,
    sku: "TW-W-008",
    category: "Blouses",
    brand:"Zara",
    fit: "FeminineWear",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Summer Collection",
    material: "Viscose",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=36",
        altText: "Ruffle-Sleeve Blouse",
      },
    ],
    rating: 4.5,
    numReviews: 19,
  },
  {
    name: "Classic Button-Up Shirt",
    description:
      "A versatile button-up shirt that can be dressed up or down. Made from soft fabric with a tailored fit, it's perfect for both casual and formal occasions.",
    price: 60,
    discountPrice: 55,
    sku: "TW-W-009",
    category: "Shirts",
    brand:"Zara",
    fit: "ClassicStyle",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Office Collection",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=37",
        altText: "Classic Button-Up Shirt",
      },
    ],
    rating: 4.8,
    numReviews: 25,
  },
  {
    name: "V-Neck Wrap Top",
    description:
      "A chic v-neck wrap top with a tie waist. Its elegant style makes it perfect for both casual and semi-formal occasions.",
    price: 50,
    discountPrice: 45,
    sku: "TW-W-010",
    category: "Tops",
    brand:"Nike",
    fit: "ChicWrap",
      variants: [
    {
      "color": "Black",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Black",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Black",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Black",
      "size": "XL",
      "stock": 10
    },
    {
      "color": "White",
      "size": "S",
      "stock": 20
    },
    {
      "color": "White",
      "size": "M",
      "stock": 15
    },
    {
      "color": "White",
      "size": "L",
      "stock": 10
    },
      {
      "color": "White",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Red",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Red",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Red",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Red",
      "size": "XL",
      "stock": 10
    }
    ,
    {
      "color": "Blue",
      "size": "S",
      "stock": 20
    },
    {
      "color": "Blue",
      "size": "M",
      "stock": 15
    },
    {
      "color": "Blue",
      "size": "L",
      "stock": 10
    },
      {
      "color": "Blue",
      "size": "XL",
      "stock": 10
    }
  ],
    collections: "Evening Collection",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://picsum.photos/500/500?random=38",
        altText: "V-Neck Wrap Top",
      },
    ],
    rating: 4.7,
    numReviews: 22,
  },
];

module.exports = products;
