const news = [
  {
    id: 1,
    headline: 'Technology Company XYZ Launches New Smartphone Model',
    date: new Date('2022-01-05').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      'Technology Company XYZ has announced the launch of their latest smartphone model, the XYZ Pro. This new device boasts a number of impressive features, including a high-resolution camera, a powerful processor, and a long-lasting battery. The company is confident that the XYZ Pro will be a hit with consumers, and they are already taking pre-orders on their website.',
    image: 'https://picsum.photos/id/10/200/300',
  },
  {
    id: 2,
    headline: 'World Health Organization Warns of New Virus Outbreak',
    date: new Date('2022-02-12').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      'The World Health Organization (WHO) has issued a warning about a new virus outbreak that has been detected in several countries. The virus, which has been named Viro-19, is highly contagious and can cause severe respiratory symptoms in some patients. The WHO is urging countries to take immediate action to contain the spread of the virus, and is working with scientists and healthcare professionals to develop treatments and vaccines.',
    image: 'https://picsum.photos/id/20/200/300',
  },
  {
    id: 3,
    headline: 'Local Sports Team Wins Championship Game',
    date: new Date('2022-03-20').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      "The hometown team has done it! They've won the championship game after a hard-fought battle against their rivals. Fans are celebrating in the streets and the team is already making plans for next season. Coach Johnson praised his players for their hard work and dedication, and said that this victory is just the beginning of many more to come.",
    image: 'https://picsum.photos/id/30/200/300',
  },
  {
    id: 4,
    headline: 'Stock Market Sees Record Highs Amid Economic Recovery',
    date: new Date('2022-04-08').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      "Investors are feeling optimistic about the economy as the stock market hits record highs. Many experts attribute this growth to the government's stimulus package, which has provided relief to individuals and businesses impacted by the pandemic. While some caution that the market could experience a downturn in the future, most are bullish on the long-term prospects for the economy.",
    image: 'https://picsum.photos/id/40/200/300',
  },
  {
    id: 5,
    headline: 'Archeologists Discover Ancient City in the Middle East',
    date: new Date('2022-05-16').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      'A team of archeologists has made a stunning discovery in the Middle East - an ancient city that dates back thousands of years. The city is remarkably well-preserved, with intact buildings, streets, and even artwork. The team believes that this discovery could shed new light on the history of the region and help us better understand the civilizations that thrived there.',
    image: 'https://picsum.photos/id/50/200/300',
  },
  {
    id: 6,
    headline: 'Technology Company XYZ Launches New Smartphone Model',
    date: new Date('2022-01-05').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      'Technology Company XYZ has announced the launch of their latest smartphone model, the XYZ Pro. This new device boasts a number of impressive features, including a high-resolution camera, a powerful processor, and a long-lasting battery. The company is confident that the XYZ Pro will be a hit with consumers, and they are already taking pre-orders on their website.',
    image: 'https://picsum.photos/200/300',
  },
  {
    id: 7,
    headline: 'World Health Organization Warns of New Virus Outbreak',
    date: new Date('2022-02-12').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      'The World Health Organization (WHO) has issued a warning about a new virus outbreak that has been detected in several countries. The virus, which has been named Viro-19, is highly contagious and can cause severe respiratory symptoms in some patients. The WHO is urging countries to take immediate action to contain the spread of the virus, and is working with scientists and healthcare professionals to develop treatments and vaccines.',
    image: 'https://picsum.photos/id/14/200/300',
  },
  {
    id: 8,
    headline: 'Local Sports Team Wins Championship Game',
    date: new Date('2022-03-20').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      "The hometown team has done it! They've won the championship game after a hard-fought battle against their rivals. Fans are celebrating in the streets and the team is already making plans for next season. Coach Johnson praised his players for their hard work and dedication, and said that this victory is just the beginning of many more to come.",
    image: 'https://picsum.photos/id/13/200/300',
  },
  {
    id: 9,
    headline: 'Stock Market Sees Record Highs Amid Economic Recovery',
    date: new Date('2022-04-08').toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }),
    article:
      "Investors are feeling optimistic about the economy as the stock market hits record highs. Many experts attribute this growth to the government's stimulus package, which has provided relief to individuals and businesses impacted by the pandemic. While some caution that the market could experience a downturn in the future, most are bullish on the long-term prospects for the economy.",
    image: 'https://picsum.photos/id/1/200/300',
  },
];
export default news;
