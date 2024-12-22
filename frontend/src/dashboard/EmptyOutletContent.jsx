import React, { useState }  from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaImage } from 'react-icons/fa';
import Header from "./Header2"
import { FaRegCopy, FaCheck } from "react-icons/fa";

const EmptyOutletContent = () => {

    const [copied, setCopied] = useState(false);

  const codeSnippet = `
def apply_kernels_with_multiple_layers(images, kernels_list):
   
    input_layer = Input(shape=(500, 500, 1))
    x = input_layer

    # Add convolutional layers for each kernel in the list
    for kernel in kernels_list:
        kernel = kernel[..., np.newaxis, np.newaxis]  # Adjust kernel dimensions
        x = Conv2D(
            filters=1,
            kernel_size=(3, 3),
            kernel_initializer=tf.keras.initializers.Constant(kernel),
            use_bias=False,
            padding='same'
        )(x)

    # Build and compile the model
    model = Model(inputs=input_layer, outputs=x)
    model.compile(optimizer='adam', loss='mse')

    return model.predict(images)
  `;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset "copied" status after 2 seconds
  };
  return (
    < >
    <Header/>
    <div className="flex  flex-col rounded-md items-center justify-center h-full m-8 mt-16  text-gray-700 p-6 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 relative overflow-hidden">
      {/* Animated Border */}
      <div className="absolute inset-0  border-4 border-transparent rounded-lg animate-border-glow pointer-events-none" />

      {/* Animated Icons */}
      <div className='flex flex-row gap-6'>

      
      <motion.div
        className="mb-4 hover:scale-110 transition-transform duration-300 shadow-lg rounded-full bg-white p-4"
        animate={{ rotate: [0, 360, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FaBrain size={64} color="#4CAF50" />
      </motion.div>
      <motion.div
        className="mb-4 hover:scale-110 transition-transform duration-300 shadow-lg rounded-full bg-white p-4"
        animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <FaImage size={64} color="#FF5722" />
      </motion.div>
      </div>

      {/* Emojis */}
      <div className="text-4xl mb-4 animate-pulse">🖼️ 🤖 🎨</div>

      {/* Explanation */}
      <h2 className="text-2xl font-bold mb-2 hover:text-purple-700 transition-colors duration-300">
        Understanding Convolutional Neural Networks (CNNs)
      </h2>
      <p className="text-center max-w-3xl mb-4 hover:text-blue-600 transition-colors duration-300">
        A <strong>Convolutional Neural Network (CNN)</strong> is a type of deep learning model used primarily for image recognition and classification.
        It works by applying filters (kernels) to the input image, detecting patterns like edges, shapes, and textures, layer by layer.
      </p>
      <p className="text-center max-w-3xl mb-4 hover:text-blue-600 transition-colors duration-300">
        Using the <strong>Keras</strong> library in Python, you can build CNN models with layers like <code>Conv2D</code> for convolution operations.
      </p>
      <div className="relative bg-gray-100 p-4 rounded shadow-lg">
      {/* Copy Button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded flex items-center space-x-2 transition duration-200"
      >
        {copied ? <FaCheck className="text-green-500" /> : <FaRegCopy />}
        <span className="text-sm">{copied ? "Copied" : "Copy"}</span>
      </button>

      {/* Code Block */}
      <pre className="text-sm font-mono overflow-x-auto bg-white rounded-lg p-4">
        <code>{codeSnippet.trim()}</code>
      </pre>
    </div>

      
    </div>
    </>
    
  );
};

export default EmptyOutletContent;
