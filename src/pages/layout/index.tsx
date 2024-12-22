import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router';
import { createListCollection, Portal, Select } from '@ark-ui/react';
import { AnimatePresence, motion } from 'motion/react';

const routesLabels: Record<string, string> = {
  engineer: 'Інженерний',
  graphic: 'Графічний',
  calculus: 'Аналіз',
};

export const Layout = ({ routes }: { routes: string[] }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [value, setValue] = useState(pathname.substring(1));
  const [open, setOpen] = useState(false);

  const onValueChanged = (d: Select.ValueChangeDetails<string>) => {
    setValue(d.value[0]);
    navigate(d.value[0]);
  };

  const onOpenChange = (d: Select.OpenChangeDetails) => {
    setOpen(d.open);
  };

  useEffect(() => setValue(pathname.substring(1)), [pathname]);

  return (
    <>
      <header className="h-16 px-6 flex items-center gap-8 border-b-2 border-black">
        <Link to="/engineer">
          <div className="flex items-center gap-3 select-none">
            <img src="/logo.svg" />
            <div className="text-sm font-bold">Uni Calc</div>
          </div>
        </Link>
        <Select.Root
          collection={createListCollection({ items: routes })}
          defaultValue={[value]}
          onValueChange={onValueChanged}
          onOpenChange={onOpenChange}
        >
          <Select.Control>
            <Select.Trigger className="h-9 pl-4 pr-2 flex items-center gap-2 text-sm rounded-lg select-none bg-neutral-900">
              <Select.ValueText className="leading-none">
                {routesLabels[value]}
              </Select.ValueText>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="material-symbols-outlined text-lg"
              >
                keyboard_arrow_down
              </motion.span>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <AnimatePresence>
                {open && (
                  <motion.div
                    exit={{ opacity: 0, y: 15 }}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="py-2 px-2 rounded-lg bg-neutral-900"
                  >
                    <Select.ItemGroup className="flex flex-col gap-2">
                      {routes.map(r => (
                        <Select.Item
                          key={r}
                          item={r}
                          className="flex py-1 text-sm cursor-pointer rounded-lg select-none hover:bg-neutral-800 data-[state=checked]:bg-neutral-800 transition"
                        >
                          <Select.ItemIndicator className="w-1 rounded-full bg-blue-700" />
                          <Select.ItemText className="py-1 px-4">
                            {routesLabels[r]}
                          </Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.ItemGroup>
                  </motion.div>
                )}
              </AnimatePresence>
            </Select.Positioner>
          </Portal>
        </Select.Root>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};
