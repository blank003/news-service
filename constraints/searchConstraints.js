const searchConstraints = {
    q: {
      required: true,
      minLength: 3,
    },
    lang: {
        defaultValue: 'en',
        allowedValues: ['ar', 'zh','nl','en','fr','de','el','he','hi','it','ja','ml','mr','no','pt','ro','ru','es','sv','ta','te','uk'],
    },
    country: {
        defaultValue: 'us',
        allowedValues: ['au','br','ca','cn','eg','fr','de','gr','hk','in','ie','il','it','jp','nl','no','pk','pe','ph','pt','ro','ru','sg','es','se','ch','tw','ua','gb','us'],
    },
    max: {
        defaultValue: 10,
        minValue: 1,
        maxValue: 100,
    },
    in: {
        defaultValue: 'title,description',
        allowedValues: ['title', 'description', 'content'],
      },
    from: {
    // No default value is set, it can be "none" when not provided
    },
    to: {
    // No default value is set, it can be "none" when not provided
    },
    nullable: {
        defaultValue: 'None',
        allowedValues: ['None', 'title', 'description', 'content'],
    },
    sortby: {
        defaultValue: 'publishedAt',
        allowedValues: ['publishedAt', 'relevance'],
    },
    // Add more constraints for other parameters as needed
  };

module.exports = {searchConstraints};