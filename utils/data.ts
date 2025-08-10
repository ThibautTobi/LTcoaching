export type dataType = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  Description: string;
  liste: string[];
  price: string;
  showLink?: boolean;
  showImage?: boolean;
  categories: ('sport' | 'bien-être' | 'nutrition')[];
};

export const DataService: dataType[] = [
  {
    id: 'coaching-sportif-1',
    title: 'Coaching Personnalisé',
    image: '/coaching-personalise.jpg',
    imageAlt: 'image-coaching-personalise',
    Description:
      'Accompagnement personnalisé pour atteindre vos objectifs de remise en forme, de performance ou de santé. Chaque séance est adaptée à votre niveau, vos contraintes et vos envies, avec un suivi régulier pour optimiser vos résultats.',
    liste: [
      'prise de masse',
      'perte de poids',
      'reathlétisation',
      'remise en forme',
      'force',
      'pathologique',
      'préparation de test ou concours',
    ],
    price: '50€ / séance',
    categories: ['sport'],
  },
  {
    id: 'coaching-nutrition-1',
    title: 'Coaching Nutritionnel',
    image: '/nutrition.jpg',
    imageAlt: 'image-coaching nutrition',
    Description:
      'Vous souhaitez perdre du poids, prendre du muscle, mieux manger ou simplement retrouver de bonnes habitudes alimentaires ? Mon service de coaching nutritionnel personnalisé vous accompagne étape par étape pour atteindre vos objectifs, durablement et sans frustration.',
    liste: [],
    price: '200€ / Plan Nutritionnel',
    categories: ['nutrition'],
  },
  {
    id: 'coaching-en-ligne-1',
    title: `Plan d'entrainements`,
    image: '/programme.jpg',
    imageAlt: 'image-plan-entrainement',
    Description: `Vous cherchez un programme d'entraînement clair, structuré et efficace sans perdre de temps à tester des méthodes au hasard ? Je vous propose un plan d’entraînement personnalisé, conçu selon vos objectifs, votre niveau et vos contraintes personnelles, pour vous permettre de progresser en toute sécurité et avec des résultats visibles.`,
    liste: [],
    price: '80€ / Plan d entrainement',
    categories: ['sport'],
  },
  {
    id: 'coaching-en-ligne-2',
    title: 'Coaching sportif en entreprise et événements',
    image: '/coaching-entreprise.jpg',
    imageAlt: 'image-coaching-entreprise',
    Description:
      'Entrainement de groupe pour améliorer la santée et cohésion votre équipe',
    liste: [],
    price: `Contacter nous directement pour s'adapter a vos besoins`,
    categories: ['bien-être'],
  },
];
