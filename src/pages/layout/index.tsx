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
      <header className="flex h-16 items-center gap-8 border-b-2 border-black px-6">
        <Link to="/engineer">
          <div className="flex select-none items-center gap-3">
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
            <Select.Trigger className="flex h-9 select-none items-center gap-2 rounded-lg bg-neutral-900 pl-4 pr-2 text-sm">
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
                    className="rounded-lg bg-neutral-900 px-2 py-2"
                  >
                    <Select.ItemGroup className="flex flex-col gap-2">
                      {routes.map((r) => (
                        <Select.Item
                          key={r}
                          item={r}
                          className="flex cursor-pointer select-none rounded-lg py-1 text-sm transition hover:bg-neutral-800 data-[state=checked]:bg-neutral-800"
                        >
                          <Select.ItemIndicator className="w-1 rounded-full bg-blue-700" />
                          <Select.ItemText className="px-4 py-1">
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
