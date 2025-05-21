'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Satisfied Clients', value: '30+' },
    { label: 'Technologies', value: '20+' },
  ];

  return (
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">About Me</h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full h-[300px] md:h-[400px] flex justify-center items-center">
                <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] rounded-full overflow-hidden relative">
                  <Image
                    src="/images/me2.jpeg"
                    alt="ISHIMWE GHISLAIN"
                    className="w-full h-full object-cover object-center"
                    style={{
                      boxShadow: '0 0 30px rgba(0, 112, 243, 0.5)',
                    }}
                    width={350}
                    height={350}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent rounded-full"></div>

                  {/* Animated border */}
                  <div className="absolute inset-[-5px] rounded-full border-4 border-blue-500 animate-spin-slow"></div>
                  <div className="absolute inset-[-10px] rounded-full border-4 border-blue-300 opacity-50 animate-spin-slow-reverse"></div>
                </div>
              </div>
              <div className="w-full h-[400px] rounded-lg overflow-hidden relative hidden md:block">
                <Image
                  src="/images/fam.jpeg"
                  alt="Family Photo"
                  className="w-full h-full object-cover object-center rounded-lg"
                  style={{
                    boxShadow: '0 0 30px rgba(0, 112, 243, 0.5)',
                    border: '3px solid rgba(0, 112, 243, 0.3)'
                  }}
                  width={400}
                  height={400}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-medium text-sm">With my family in Kamonyi</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              I&apos;m ISHIMWE GHISLAIN, a Passionate Fullstack Developer
            </h3>
            <p className="text-gray-300 mb-6">
              Based in Kamonyi, Ruyenzi in Rwanda, I am a versatile professional with expertise in fullstack development,
              software engineering, graphic design, and content creation. With a passion for creating innovative digital
              solutions, I combine technical skills with creative thinking to deliver exceptional results.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in the tech world has equipped me with a diverse skill set across multiple programming languages
              and frameworks. I specialize in building responsive web applications, creating intuitive user interfaces,
              and developing robust backend systems.
            </p>
            <p className="text-gray-300 mb-8">
              Beyond coding, I have a keen eye for design and a talent for creating engaging content. This unique combination
              allows me to approach projects holistically, ensuring both functionality and aesthetic appeal.
            </p>

            <div className="mt-8 mb-8 rounded-lg overflow-hidden relative w-full h-[200px] md:hidden">
              <Image
                src="/images/fam.jpeg"
                alt="Family Photo"
                className="w-full h-full object-cover object-center rounded-lg"
                style={{
                  boxShadow: '0 0 20px rgba(0, 112, 243, 0.3)',
                  border: '2px solid rgba(0, 112, 243, 0.2)'
                }}
                width={400}
                height={200}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <p className="font-medium">With my family in Kamonyi, Rwanda</p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-900 p-4 rounded-lg text-center"
                >
                  <h4 className="text-2xl md:text-3xl font-bold text-blue-500">{stat.value}</h4>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <a
                href="#contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-full transition-colors duration-300"
              >
                Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
