import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is Ballistic Recognition?",
    answer:
      "Ballistic recognition is a forensic technology that identifies and matches bullets and cartridge cases to specific firearms based on their unique markings.",
  },
  {
    question: "How does the system work?",
    answer:
      "The system captures high-resolution images of bullet and cartridge surfaces, extracts microscopic markings, and uses pattern-matching algorithms to compare them with a database of known samples.",
  },
  {
    question: "What is the purpose of this project?",
    answer:
      "This project assists law enforcement and forensic experts in linking firearms to criminal cases quickly and accurately, reducing investigation time.",
  },
  {
    question: "How accurate is the recognition system?",
    answer:
      "With proper calibration and a large reference database, modern ballistic recognition systems can achieve over 90% accuracy in correctly matching bullet samples.",
  },
  {
    question: "Is the data stored securely?",
    answer:
      "Yes. All ballistic images and metadata are encrypted and stored securely. Only authorized personnel can access the system.",
  },
  {
    question: "Can this system be integrated with law enforcement databases?",
    answer:
      "Absolutely. It can be connected with existing law enforcement ballistic databases for cross-jurisdictional investigations.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14 text-cyan-900 font-serif underline underline-offset-8 decoration-4 decoration-cyan-500">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="bg-white rounded-2xl border-2 border-cyan-700 border-dashed shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-lg text-cyan-900">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="text-cyan-500" size={20} />
                  ) : (
                    <Plus className="text-teal-500" size={20} />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-cyan-700 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
