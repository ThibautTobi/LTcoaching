export type dataType = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: string;
};

export const DataService: dataType[] = [
  {
    id: 'coaching-sportif',
    title: 'Coaching Sportif Personnalisé',
    shortDescription: 'Programme d’entraînement adapté à vos objectifs.',
    longDescription:
      'Profitez d’un coaching sportif sur-mesure avec un suivi régulier, adapté à votre niveau et vos objectifs (prise de masse, perte de poids, remise en forme).',
    price: '50€/séance',
  },
  {
    id: 'coaching-nutrition',
    title: 'Coaching Nutritionnel',
    shortDescription: 'Plan alimentaire personnalisé et suivi hebdomadaire.',
    longDescription:
      'Élaborez un plan nutritionnel sain et durable, adapté à vos besoins physiologiques, vos objectifs et vos contraintes alimentaires.',
    price: '70€/mois',
  },
  {
    id: 'coaching-en-ligne',
    title: 'Coaching en ligne',
    shortDescription: 'Suivi à distance via une application dédiée.',
    longDescription:
      'Recevez des programmes, vidéos et conseils directement sur votre mobile. Idéal pour les personnes autonomes avec un emploi du temps chargé.',
    price: '40€/mois',
  },
];
