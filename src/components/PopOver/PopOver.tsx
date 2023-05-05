import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react'
import { useState, useRef, useId } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopOver: React.ReactNode
  className?: string
}
export default function PopOver({ children, renderPopOver, className }: Props) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const arrowRef = useRef<HTMLElement>(null)
  const { x, y, strategy, refs, middlewareData } = useFloating({
    middleware: [offset(5), shift(), arrow({ element: arrowRef })],
    placement: 'bottom-end'
  })
  const showPopover = () => {
    setOpen(true)
  }
  const hidePopover = () => {
    setOpen(false)
  }
  return (
    <div className={className} ref={refs.setReference} onMouseEnter={showPopover} onMouseLeave={hidePopover}>
      {children}

      <FloatingPortal id={id}>
        <AnimatePresence>
          {open && (
            <motion.div
              ref={refs.setFloating}
              style={{
                position: strategy,
                top: y ?? 0,
                left: x ?? 0,
                width: 'max-content',
                transformOrigin: `${middlewareData.arrow?.x}px top`
              }}
              initial={{ opacity: 0, transform: 'scale(0)' }}
              animate={{ opacity: 1, transform: 'scale(1)' }}
              exit={{ opacity: 0, transform: 'scale(0)' }}
              transition={{ duration: 0.3 }}
            >
              <span
                ref={arrowRef}
                className=' z-100 absolute -translate-y-full border-[11px] border-white border-x-transparent border-t-transparent '
                style={{
                  left: middlewareData.arrow?.x,
                  top: middlewareData.arrow?.y
                }}
              ></span>
              {renderPopOver}
            </motion.div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </div>
  )
}
