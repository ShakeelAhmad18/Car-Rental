export const carBrands = [
      "BMW",
      "Tesla",
      "Ford",
      "Mercedes",
      "Audi",
      "Kia",
      "Honda",
      "Toyota",
    ];

    export const carCategories = [
      "Convertible",
      "Coupe",
      "Sedan",
      "EV",
      "Hatchback",
      "Luxury",
      "SUV",
      "Wagon",
    ];

    export const carModels = [
      "2025",
      "2024",
      "2023",
      "2022",
      "2021",
      "2020",
      "2019",
      "2018",
      "2017"
    ];
    export const carColors = [
      "Red",
      "Blue",
      "Green",
      "Black",
      "White",
      "Silver",
      "Gray",
      "Yellow",
    ];


    export const carFuelTypes = [
      "Petrol",
      "Diesel",
      "Electric",
      "CNG"
    ];

   
 export const carMileage=[
    "Limited",
    "Unlimited"
 ]


export const carTransmission=[
    "Manual",
    "Automatic"
]

export const carSeats=[
    "2",
    "4",
    "5",
    "6",
    "7",
    "8"
]


export const generateMapUrl = (latitude, longitude) => {
    return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6509170.989457427!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb9fe5f285e3d%3A0x8b5109a227086f55!2sCalifornia%2C%20USA!5e0!3m2!1sen!2sin!4v1669181581381!5m2!1sen!2sin`;
  };