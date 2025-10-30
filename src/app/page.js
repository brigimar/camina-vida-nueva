import { getTestimonios } from '@/lib/notion';
import HeroAnimated from '@/components/HeroAnimated';
import BenefitsAnimated from '@/components/BenefitsAnimated';
import MethodLucide from '@/components/MethodLucide';
import PlansAnimated from '@/components/PlansAnimated';
import TestimonialsAnimated from '@/components/TestimonialsAnimated';
import CTAFinal from '@/components/CTAFinal';

export const metadata = {
  title: 'Caminatas Saludables | Tu Medicina Camina',
  description: 'Descubre cómo nuestras caminatas terapéuticas pueden transformar tu salud.',
};

export default async function Home() {
  const testimonios = await getTestimonios();

  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      <HeroAnimated />
      <BenefitsAnimated />
      <MethodLucide />
      <PlansAnimated />
      <TestimonialsAnimated testimonios={testimonios} />
      <CTAFinal />
    </div>
  );
}