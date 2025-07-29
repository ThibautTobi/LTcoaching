export type dataType = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  Description: string;
  price: string;
  showLink?: boolean;
  showImage?: boolean;
  categories: ('sport' | 'bien-être' | 'nutrition')[];
};

export const DataService: dataType[] = [
  // {
  //   id: 'coaching-sportif-1',
  //   title: 'Coaching Sportif Personnalisé',
  //   image: 'src',
  //   imageAlt: 'src3',
  //   Description: 'Programme d’entraînement adapté à vos objectifs.',
  //   price: '50€ / séance',
  //   categories: ['sport'],
  // },
  {
    id: 'coaching-nutrition-1',
    title: 'Coaching Nutritionnel',
    image: '/nutrition.jpg',
    imageAlt: 'src3',
    Description: 'Plan alimentaire personnalisé et suivi hebdomadaire.',
    price: '200€ / Plan Nutritionnel',
    categories: ['nutrition'],
  },
  // {
  //   id: 'coaching-en-ligne-1',
  //   title: 'Coaching en ligne',
  //   image: 'src',
  //   imageAlt: 'src3',
  //   Description: 'Suivi à distance via une application dédiée.',
  //   price: '40€ / séance',
  //   categories: ['sport'],
  // },
  //   {
  //   id: 'coaching-en-ligne-2',
  //   title: 'Coaching en ligne',
  //   image: 'src',
  //   imageAlt: 'src3',
  //   Description: 'Suivi à distance via une application dédiée.',
  //   price: '40€ / séance',
  //   categories: ['bien-être'],
  // },
];
