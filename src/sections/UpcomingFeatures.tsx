import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Sparkles, Zap, Shield, Smartphone, Rocket, Globe } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Magic',
    description:
      'Experience the future with our AI-driven personalized recommendations.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    title: 'Lightning Speed',
    description: 'Blazing fast performance that will leave you speechless.',
    gradient: 'from-yellow-400 to-orange-500',
  },
  {
    icon: Shield,
    title: 'Fort Knox Security',
    description:
      'Bank-grade encryption and authentication to keep your data safe.',
    gradient: 'from-green-400 to-cyan-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile Harmony',
    description:
      'Seamless integration between desktop and our upcoming mobile app.',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Rocket,
    title: 'Skyrocketing Features',
    description:
      'Constantly evolving with cutting-edge features and improvements.',
    gradient: 'from-red-500 to-pink-500',
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Connect and collaborate with users from around the world.',
    gradient: 'from-teal-400 to-blue-500',
  },
];

export default function UpcomingFeatures() {
  return (
    <section
      className="bg-gradient-to-b from-[#FFFFFF] to-[#D2DCFF] py-24 overflow-x-clip"
      id="updates"
    >
      <div className="container px-4 md:px-6">
        <h2 className="section-title text-3xl md:text-5xl font-bold text-center mb-12 bg-clip-text text-transparent">
          Upcoming Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`bg-gradient-to-br ${feature.gradient} border-none text-white overflow-hidden`}
            >
              <CardHeader className="pb-0">
                <div className="w-12 h-12 mb-4 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg opacity-90">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
