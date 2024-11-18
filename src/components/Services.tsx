import React from 'react';
import { User, Fingerprint, MapPin, Stamp, Calendar, Search } from 'lucide-react';
import Panel from './Panel';

const IMAGEKIT_URL = 'https://ik.imagekit.io/appraisily';

const services = [
  {
    id: 'maker',
    name: 'Maker Analysis',
    description: 'Identify potential creator',
    icon: User,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_fc752f0c-9845-4187-892b-41cb30e447e1.png?tr=w-200,h-200`,
    position: { x: 350, y: -100 }
  },
  {
    id: 'signature',
    name: 'Signature Check',
    description: 'Analyze signatures',
    icon: Fingerprint,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_937ed6cc-0969-479b-aec9-a9a371d8cc8b.png?tr=w-200,h-200`,
    position: { x: 350, y: 100 }
  },
  {
    id: 'origin',
    name: 'Origin Analysis',
    description: 'Determine likely origin',
    icon: MapPin,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_aa009cf3-7aa8-493f-a3e5-6dee036f5311.png?tr=w-200,h-200`,
    position: { x: -350, y: -100 }
  },
  {
    id: 'marks',
    name: 'Marks Recognition',
    description: 'Identify maker marks',
    icon: Stamp,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_8561145d-60b4-468e-9094-c0cdea16e440.png?tr=w-200,h-200`,
    position: { x: -350, y: 100 }
  },
  {
    id: 'age',
    name: 'Age Analysis',
    description: 'Estimate creation period',
    icon: Calendar,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_90c3d603-4bed-4911-987d-7579f27bfc6b.png?tr=w-200,h-200`,
    position: { x: 0, y: -150 }
  },
  {
    id: 'visual',
    name: 'Visual Search',
    description: 'Find similar artworks',
    icon: Search,
    image: `${IMAGEKIT_URL}/appraisily.com_an_image_for_an_online_art_appraisal_service_tha_6ac023f3-b669-4d66-a044-e2295cf25a1d.png?tr=w-200,h-200`,
    position: { x: 0, y: 150 }
  }
];

interface ServicesProps {
  activeService?: string;
}

const Services: React.FC<ServicesProps> = ({ activeService }) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-grid -skew-y-3 rounded-3xl" />
      <div className="relative mx-auto max-w-4xl px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Analysis Tools</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our suite of specialized AI tools work together to analyze every aspect of your artwork
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Panel
              key={service.id}
              title={service.name}
              description={service.description}
              image={service.image}
              icon={service.icon}
              isActive={activeService === service.id}
              isComplete={activeService !== service.id && service.id === 'visual'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;