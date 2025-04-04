import {
  MapPinIcon,
  TrashIcon,
  TruckIcon,
  ClipboardDocumentCheckIcon,
  CalendarDaysIcon,
  CreditCardIcon,
} from '@heroicons/react/24/outline';

const steps = [
  {
    id: 1,
    name: 'Postcode',
    icon: MapPinIcon,
    isActive: true,
  },
  {
    id: 2,
    name: 'Waste Type',
    icon: TrashIcon,
    isActive: true,
  },
  {
    id: 3,
    name: 'Select Skip',
    icon: TruckIcon,
    isActive: true,
  },
  {
    id: 4,
    name: 'Permit Check',
    icon: ClipboardDocumentCheckIcon,
    isActive: false,
  },
  {
    id: 5,
    name: 'Schedule',
    icon: CalendarDaysIcon,
    isActive: false,
  },
  {
    id: 6,
    name: 'Payment',
    icon: CreditCardIcon,
    isActive: false,
  },
];

export const Timeline = () => {
  const lastActiveIndex = steps.reduce((acc, step, index) => (step.isActive ? index : acc), 0);
  const progressPercentage = (lastActiveIndex / (steps.length - 1)) * 100;

  return (
    <div className="w-full bg-[#efe1b8] dark:bg-gray-800 pt-24 pb-8">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="relative">
          <div className="absolute top-5 left-0 w-full h-0.5 bg-neutral-200 dark:bg-neutral-700" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />

          <div className="relative flex justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`
                  flex flex-col items-center
                  ${index < 2 || index > 3 ? 'hidden md:flex' : ''}
                `}
              >
                <div className="relative z-10">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${
                        step.isActive
                          ? 'bg-primary text-white'
                          : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400'
                      }
                      transition-colors duration-200
                    `}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                </div>
                <span
                  className={`
                    mt-2 text-sm font-medium
                    ${step.isActive ? 'text-primary' : 'text-neutral-600 dark:text-neutral-600'}
                    transition-colors duration-200
                  `}
                >
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
