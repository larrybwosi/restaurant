const testimonials = [
  {
    quote: "StreamLine has revolutionized our workflow. It's a game-changer!",
    author: "Jane Doe, CEO of TechCorp",
  },
  {
    quote: "The productivity boost we've seen with StreamLine is incredible.",
    author: "John Smith, CTO of InnovateCo",
  },
  {
    quote: "I can't imagine running our business without StreamLine now.",
    author: "Alice Johnson, Founder of StartupX",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-20 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

