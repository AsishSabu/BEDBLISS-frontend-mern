import { Field } from 'formik';
import { FormValueType } from '../../../types/hotelInterface';


const Form4 = ({ values }: FormValueType) => {
  return (
    <div className="overflow-auto flex flex-col gap-4 h-full w-full items-start font-mono text-left">
      <h2 className="text-Marine_blue font-black text-3xl tracking-[-2px]">
        Pick add-ons
      </h2>
      <p className="text-Cool_gray tracking-tighter self-start text-sm">
        Add-ons help to enhance your gaming experience.
      </p>
      <div className="flex gap-4 w-full flex-col">
        <label
          className={`${
            values.addOn.includes('services')
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] p-6 flex items-center gap-8 max-sm:gap-4 max-sm:p-3 w-full cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field
            type="checkbox"
            name="addOn"
            value="services"
            className="w-5 h-5"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-Marine_blue font-extrabold text-lg max-sm:text-xs">
              Online service
            </h4>
            <p className="text-Cool_gray tracking-tighter text-sm font-medium max-sm:text-xs">
              Access to multiplayer games
            </p>
          </div>
          <p className="ml-auto text-Purplish_blue font-semibold max-sm:text-xs">
            +$1/mo
          </p>
        </label>
        <label
          className={`${
            values.addOn.includes('storage')
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] p-6 flex items-center gap-8 max-sm:gap-4 max-sm:p-3 w-full cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field
            type="checkbox"
            name="addOn"
            value="storage"
            className="w-5 h-5"
          />
          <div className="flex flex-col gap-1">
            <h4 className="text-Marine_blue font-extrabold text-lg max-sm:text-xs">
              Larger storage
            </h4>
            <p className="text-Cool_gray tracking-tighter text-sm font-medium max-sm:text-xs">
              Extra 1TB cloud storage
            </p>
          </div>
          <p className="ml-auto text-Purplish_blue font-semibold max-sm:text-xs">
            +$2/mo
          </p>
        </label>
        <label
          className={`${
            values.addOn.includes('pass')
              ? 'bg-Magnolia border-Purplish_blue border-[1px]'
              : ''
          }border-Light_gray border-[1px] p-6 flex items-center gap-8 max-sm:gap-4 max-sm:p-3 w-full cursor-pointer ease-in-out duration-200 hover:border-Purplish_blue rounded-lg`}>
          <Field
            type="checkbox"
            name="addOn"
            value="pass"
            className="w-5 h-5"
          />
          <div className="flex flex-col gap-1  ">
            <h4 className="text-Marine_blue font-extrabold text-lg max-sm:text-xs">
              Game Pass
            </h4>
            <p className="text-Cool_gray tracking-tighter text-sm font-medium max-sm:text-xs">
              Access to exclusive games
            </p>
          </div>
          <p className="ml-auto text-Purplish_blue font-semibold max-sm:text-xs">
            +$10/mo
          </p>
        </label>
      </div>
    </div>
  );
};

export default Form4;