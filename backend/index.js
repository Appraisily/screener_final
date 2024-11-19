// Add this new endpoint after the existing /upload-image endpoint

app.post('/classify-item', async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: 'Image URL is required'
      });
    }

    // Construct the message for GPT-4 Vision
    const messages = [
      {
        role: 'system',
        content: `You are an expert art and antiques classifier. Your task is to determine if an item is Art or Antique.
                 IMPORTANT: You must ONLY respond with either "Art" or "Antique".
                 
                 Classification guidelines:
                 - Art: Paintings, sculptures, prints, photographs, digital art, and other artistic creations
                 - Antique: Vintage furniture, collectibles, decorative items, historical artifacts, and items over 50 years old
                 
                 DO NOT provide any explanation or additional text. ONLY respond with "Art" or "Antique".`
      },
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: imageUrl } },
          { type: 'text', text: 'Classify this item as either Art or Antique. Only respond with one word: "Art" or "Antique".' }
        ]
      }
    ];

    // Call GPT-4 Vision API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages,
        max_tokens: 1,
        temperature: 0.1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to classify image with GPT-4 Vision');
    }

    const data = await response.json();
    const classification = data.choices[0].message.content.trim();

    // Validate response is either "Art" or "Antique"
    if (!['Art', 'Antique'].includes(classification)) {
      throw new Error('Invalid classification response');
    }

    res.json({
      success: true,
      classification
    });

  } catch (error) {
    console.error('Error classifying item:', error);
    res.status(500).json({
      success: false,
      message: 'Error classifying item',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});