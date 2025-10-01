export type DataType = {
  id: string;
  title: string;
  image: string;
  imageAlt: string;
  description: string;
  liste: string[];
  price: string;
  categories: ('sport' | 'bien-être' | 'nutrition')[];
};

// price a modifier en number et enlever dans data les string

export const DataService: DataType[] = [
  {
    id: 'coaching-sportif',
    title: 'Coaching Sportif Personnalisé',
    image: '/coaching-personalise.jpg',
    imageAlt: 'Séance de coaching sportif personnalisé',
    description:
      'Profitez d’un accompagnement sur mesure pour atteindre vos objectifs : remise en forme, prise de masse musculaire, perte de poids, amélioration des performances sportives ou récupération après blessure. Chaque séance est adaptée à votre niveau, votre rythme et vos contraintes, avec un suivi régulier pour garantir des résultats durables.',
    liste: [
      'Prise de masse musculaire',
      'Perte de poids',
      'Réathlétisation',
      'Remise en forme',
      'Développement de la force',
      'Adaptation pour conditions médicales',
      'Préparation physique pour tests ou concours',
    ],
    price: '45€ / séance',
    categories: ['sport'],
  },
  {
    id: 'coaching-nutrition',
    title: 'Coaching Nutritionnel Personnalisé',
    image: '/nutrition.jpg',
    imageAlt: 'Consultation de coaching nutritionnel',
    description:
      'Un accompagnement nutritionnel adapté à vos besoins : perte de poids, prise de muscle, optimisation des performances sportives ou amélioration de votre bien-être. Je crée un plan alimentaire sur mesure, simple à suivre, respectant vos préférences et votre mode de vie, pour des résultats durables sans frustration.',
    liste: [
      'Plans alimentaires personnalisés',
      'Suivi régulier et ajustements',
      'Conseils sur les compléments alimentaires',
      'Éducation nutritionnelle',
    ],
    price: '200€ / plan nutritionnel complet',
    categories: ['nutrition'],
  },
  {
    id: 'plan-entrainement',
    title: 'Plan d’Entraînement Personnalisé',
    image: '/programme.jpg',
    imageAlt: 'Plan d’entraînement sur mesure',
    description:
      'Bénéficiez d’un programme d’entraînement clair, structuré et adapté à vos objectifs, que vous soyez débutant ou confirmé. Conçu pour optimiser vos résultats tout en minimisant les risques de blessures, ce plan prend en compte votre niveau, votre emploi du temps et vos préférences.',
    liste: [
      'Plans pour la musculation',
      'Entraînement cardio',
      'Préparation physique spécifique',
      'Progression suivie',
    ],
    price: '80€ / plan d’entraînement',
    categories: ['sport'],
  },
  {
    id: 'coaching-en-entreprise',
    title: 'Coaching Sportif en Entreprise',
    image: '/coaching-entreprise.jpg',
    imageAlt: 'Séance de sport en entreprise',
    description:
      'Des séances sportives collectives adaptées au monde professionnel pour améliorer la santé, la cohésion et la motivation de vos équipes. Idéal pour réduire le stress, favoriser l’esprit d’équipe et augmenter la productivité.',
    liste: [
      'Réduction du stress',
      'Cohésion d’équipe',
      'Motivation et productivité',
      'Prévention des troubles musculosquelettiques',
      'Réduction des arrêts maladie',
    ],
    price: 'Tarif sur demande — adaptation selon vos besoins',
    categories: ['sport'],
  },
  {
    id: 'coaching-en-yoga',
    title: 'Cours de Yoga',
    image: '/yoga.jpg',
    imageAlt: 'Séance de yoga',
    description:
      'Améliorez votre souplesse, réduisez le stress et retrouvez un équilibre intérieur grâce à des séances de yoga adaptées à tous les niveaux. Idéal pour renforcer le corps et apaiser l’esprit.',
    liste: ['Yoga doux', 'Yoga dynamique', 'Respiration et relaxation'],
    price: '45€ / séance',
    categories: ['bien-être', 'sport'],
  },
  {
    id: 'coaching-en-pilate',
    title: 'Cours de Pilates',
    image: '/pilates.jpg',
    imageAlt: 'Séance de Pilates',
    description:
      'Renforcez vos muscles profonds, améliorez votre posture et développez votre souplesse grâce au Pilates. Accessible à tous, cette méthode douce est idéale pour prévenir les douleurs et optimiser la mobilité.',
    liste: [
      'Renforcement musculaire profond',
      'Amélioration de la posture',
      'Prévention des douleurs',
    ],
    price: '45€ / séance',
    categories: ['bien-être', 'sport'],
  },
  {
    id: 'coaching-en-reflexologie',
    title: 'Séance de Réflexologie',
    image: '/reflexiologie.jpg',
    imageAlt: 'Massage de réflexologie plantaire',
    description:
      'La réflexologie stimule des points précis sur les pieds, les mains ou le visage pour favoriser l’équilibre du corps, réduire les tensions et améliorer le bien-être général.',
    liste: [
      'Réflexologie plantaire',
      'Réflexologie faciale',
      'Réflexologie palmaire',
    ],
    price: '45€ / séance',
    categories: ['bien-être'],
  },
  {
    id: 'coaching-en-relaxation',
    title: 'Séance de Relaxation',
    image: '/relaxation.jpg',
    imageAlt: 'Moment de détente et relaxation',
    description:
      'Offrez-vous un moment de détente profonde pour libérer les tensions physiques et mentales.\n Techniques de respiration, visualisation et relâchement musculaire pour un bien-être immédiat.',
    liste: ['Relaxation guidée', 'Respiration profonde', 'Gestion du stress'],
    price: '45€ / séance',
    categories: ['bien-être'],
  },
  {
    id: 'coaching-en-bien-etre-du-nourrisson',
    title: 'Bien-Être du Nourrisson',
    image: '/bien-être-bébé.jpg',
    imageAlt: 'Massage pour bébé',
    description:
      'Séances douces et adaptées pour favoriser le confort, le sommeil et la détente des bébés.\n Techniques respectueuses et sécuritaires pour renforcer le lien parent-enfant.',
    liste: [
      'Massage bébé',
      'Techniques de relaxation',
      'Accompagnement des parents',
    ],
    price: '45€ / séance',
    categories: ['bien-être'],
  },
];

//   {
//     id: 'coaching-sportif',
//     title: 'Coaching Personnalisé',
//     image: '/coaching-personalise.jpg',
//     imageAlt: 'image-coaching-personalise',
//     Description:
//       'Accompagnement personnalisé pour atteindre vos objectifs de remise en forme, de performance ou de santé.\n\nChaque séance est adaptée à votre niveau, vos contraintes et vos envies, avec un suivi régulier pour optimiser vos résultats.',
//     liste: [
//       'prise de masse',
//       'perte de poids',
//       'reathlétisation',
//       'remise en forme',
//       'force',
//       'pathologique',
//       'préparation de test ou concours',
//     ],
//     price: '45€ / séance',
//     categories: ['sport'],
//   },
//   {
//     id: 'coaching-nutrition',
//     title: 'Coaching Nutritionnel',
//     image: '/nutrition.jpg',
//     imageAlt: 'image-coaching nutrition',
//     Description:
//       'Vous souhaitez perdre du poids, prendre du muscle, mieux manger ou simplement retrouver de bonnes habitudes alimentaires ?\nMon service de coaching nutritionnel personnalisé vous accompagne étape par étape pour atteindre vos objectifs, durablement et sans frustration, tout en respectant vos choix alimentaires',
//     liste: [],
//     price: '200€ / Plan Nutritionnel',
//     categories: ['nutrition'],
//   },
//   {
//     id: 'plan-entrainement',
//     title: `Plan d'entrainements`,
//     image: '/programme.jpg',
//     imageAlt: 'image-plan-entrainement',
//     Description: `Vous cherchez un programme d'entraînement clair, structuré et efficace sans perdre de temps à tester des méthodes au hasard ?\nJe vous propose un plan d’entraînement personnalisé, conçu selon vos objectifs, votre niveau et vos contraintes personnelles, pour vous permettre de progresser en toute sécurité et avec des résultats visibles.`,
//     liste: [],
//     price: '80€ / Plan d entrainement',
//     categories: ['sport'],
//   },
//   {
//     id: 'coaching-en-entreprise',
//     title: 'Coaching sportif en entreprise et événements',
//     image: '/coaching-entreprise.jpg',
//     imageAlt: 'image-coaching-entreprise',
//     Description:
//       'Entrainement de groupe pour améliorer la santée et cohésion votre équipe',
//     liste: ['permet de lutter contre le stress','favorise la cohésion','augmente la motivation et productivité des salariés','diminue les accidende travail et de maladie : coût de santé','et favorise le bien être des salarié'],
//     price: `Contacter nous directement pour s'adapter a vos besoins`,
//     categories: ['sport'],
//   },
//     {
//     id: 'coaching-en-yoga',
//     title: 'Yoga',
//     image: '/coaching-yoga.jpg',
//     imageAlt: 'image-coaching-yoga',
//     Description:
//       '',
//     liste: [],
//     price: `45€ / séance`,
//     categories: ['bien-être','sport'],
//   },
//       {
//     id: 'coaching-en-pilate',
//     title: 'Pilate',
//     image: '/coaching-yoga.jpg',
//     imageAlt: 'image-coaching-yoga',
//     Description:
//       '',
//     liste: [],
//     price: `45€ / séance`,
//     categories: ['bien-être','sport'],
//   },
//       {
//     id: 'coaching-en-reflexiologie',
//     title: 'reflexiologie',
//     image: '/reflexiologie.jpg',
//     imageAlt: 'image-reflexiologie',
//     Description:
//       '',
//     liste: [],
//     price: `45€ / séance`,
//     categories: ['bien-être'],
//   },
//       {
//     id: 'coaching-en-relaxation',
//     title: 'Relaxation',
//     image: '/coaching-relaxation.jpg',
//     imageAlt: 'image-reflexiologie',
//     Description:
//       '',
//     liste: [],
//     price: `45€ / séance`,
//     categories: ['bien-être'],
//   },
//       {
//     id: 'coaching-en-bien-être-du-nourrisson',
//     title: 'Bien-être du nourrisson',
//     image: '/bien-être-nourrison.jpg',
//     imageAlt: 'image-bien-être-nourrison',
//     Description:
//       '',
//     liste: [],
//     price: `45€ / séance`,
//     categories: ['bien-être'],
//   },
// ];
