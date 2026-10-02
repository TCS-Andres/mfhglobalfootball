import { useState } from 'react';
import { cn } from '@/lib/utils';

// Adapted from the 21st.dev "Team Showcase" component (@makviesainte): a staggered
// portrait grid paired with an interactive member list. Portraits rest in grayscale
// and the active one turns to full color. Changes for MFH: brand tokens, division
// groups, an initials tile for members without a headshot, the name under every
// portrait, and a bio that stays closed until the member is clicked.

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  image?: string;
  /** Longer copy, shown in the expandable panel. */
  blurb?: string;
  /** Always-visible fine print (the independent partner disclaimer). */
  note?: string;
}

export interface TeamGroup {
  id: string;
  label: string;
  members: TeamMember[];
}

interface TeamShowcaseProps {
  groups: TeamGroup[];
}

const COLUMN_CLASSES = [
  'lg:w-[176px]',
  'mt-10 md:mt-[68px] lg:w-[192px]',
  'mt-5 md:mt-8 lg:w-[182px]',
];

export default function TeamShowcase({ groups }: TeamShowcaseProps) {
  const members = groups.flatMap((g) => g.members);
  // The grid follows the roster order exactly (client request): reading across the
  // rows gives the same sequence as the list, initials tiles included.
  const columns = [0, 1, 2].map((c) => members.filter((_, i) => i % 3 === c));

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  // Bios start closed (client request, Oct 2026): a visitor opens one by clicking
  // the portrait or the name.
  const [openId, setOpenId] = useState<string | null>(null);
  const activeId = hoveredId ?? openId;

  const selectFromTile = (id: string) => {
    setOpenId(id);
    // On stacked layouts the list sits below the grid, so bring the row into view.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document
      .getElementById(`team-row-${id}`)
      ?.scrollIntoView({ block: 'nearest', behavior: reduce ? 'auto' : 'smooth' });
  };

  return (
    <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
      {/* Left: staggered portrait grid */}
      {/* The `reveal` classes are static strings: the site's scroll-reveal script adds
          `in` to them outside React, and React never rewrites an unchanged className. */}
      <div
        className="reveal-l flex w-full gap-2.5 md:gap-3.5 lg:w-auto lg:flex-none"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {columns.map((column, c) => (
          <div key={c} className={cn('flex min-w-0 flex-1 flex-col gap-3.5 md:gap-5 lg:flex-none', COLUMN_CLASSES[c])}>
            {column.map((member) => (
              <PhotoTile
                key={member.id}
                member={member}
                isActive={activeId === member.id}
                isDimmed={hoveredId !== null && hoveredId !== member.id}
                onHover={setHoveredId}
                onSelect={selectFromTile}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Right: members grouped by division */}
      <div className="flex min-w-0 flex-1 flex-col gap-9">
        {groups.map((group, g) => (
          <div key={group.id} className="reveal" style={{ '--d': `${g * 80}ms` } as React.CSSProperties} suppressHydrationWarning>
            <p className="eyebrow !mb-4">
              <i className="pent" />
              <span>{group.label}</span>
            </p>
            <ul className="m-0 flex list-none flex-col gap-1 border-0 border-t border-solid border-line p-0">
              {group.members.map((member) => (
                <MemberRow
                  key={member.id}
                  member={member}
                  isActive={activeId === member.id}
                  isDimmed={hoveredId !== null && hoveredId !== member.id}
                  isOpen={openId === member.id}
                  onHover={setHoveredId}
                  onToggle={(id) => setOpenId((current) => (current === id ? null : id))}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoTile({
  member,
  isActive,
  isDimmed,
  onHover,
  onSelect,
}: {
  member: TeamMember;
  isActive: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
}) {
  // Credentials after a comma ("Carlos Bernal, CPA, MAcc") stay in the list, the
  // caption under the portrait carries the name alone.
  const shortName = member.name.split(',')[0];

  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(
        'm-0 block w-full cursor-pointer appearance-none border-0 bg-transparent p-0 text-left font-[inherit] transition-opacity duration-500',
        isDimmed ? 'opacity-60' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onSelect(member.id)}
    >
      <span
        className={cn(
          'relative block aspect-[13/14] w-full overflow-hidden rounded-xl bg-navy transition-shadow duration-500',
          isActive && 'shadow-[0_18px_40px_-20px_rgba(0,53,92,0.65)]',
        )}
      >
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            width={400}
            height={430}
            loading="lazy"
            className={cn(
              'h-full w-full object-cover transition-[filter,transform] duration-700 ease-out motion-reduce:transition-none',
              isActive ? 'scale-105 grayscale-0' : 'scale-100 brightness-[0.82] grayscale',
            )}
          />
        ) : (
          <span
            className={cn(
              'grid h-full w-full place-items-center font-display text-[clamp(1.6rem,4vw,2.4rem)] font-black tracking-wide transition-colors duration-500',
              isActive ? 'text-gold' : 'text-white/35',
            )}
          >
            {member.initials}
          </span>
        )}
        <span
          className={cn(
            'pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left bg-gold transition-transform duration-500 ease-out motion-reduce:transition-none',
            isActive ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </span>
      {/* Name under every portrait, so each face is identified without the list */}
      <span
        className={cn(
          'mt-2 block font-display text-[0.7rem] font-extrabold uppercase leading-tight tracking-[0.06em] transition-colors duration-300 md:text-[0.78rem]',
          isActive ? 'text-brand' : 'text-ink',
        )}
      >
        {shortName}
      </span>
    </button>
  );
}

function MemberRow({
  member,
  isActive,
  isDimmed,
  isOpen,
  onHover,
  onToggle,
}: {
  member: TeamMember;
  isActive: boolean;
  isDimmed: boolean;
  isOpen: boolean;
  onHover: (id: string | null) => void;
  onToggle: (id: string) => void;
}) {
  const panelId = `team-panel-${member.id}`;

  const heading = (
    <span className="flex w-full items-start gap-3.5">
      {/* Fixed-width slot so the name does not shift when the marker grows */}
      <span className="mt-[0.45rem] flex h-3 w-6 flex-none">
        <span
          className={cn(
            'h-3 rounded-[5px] transition-all duration-300',
            isActive ? 'w-6 bg-gold' : 'w-4 bg-ink/20',
          )}
        />
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            'block font-display text-[1.18rem] font-extrabold leading-tight tracking-tight transition-colors duration-300',
            isActive ? 'text-brand' : 'text-ink',
          )}
        >
          {member.name}
        </span>
        <span className="mt-1.5 block font-display text-[0.7rem] font-bold uppercase leading-snug tracking-[0.14em] text-ink-soft">
          {member.role}
        </span>
      </span>
      {member.blurb && (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={cn(
            'mt-1 h-4 w-4 flex-none text-gold transition-transform duration-300 motion-reduce:transition-none',
            isOpen && 'rotate-180',
          )}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      )}
    </span>
  );

  return (
    <li
      id={`team-row-${member.id}`}
      className={cn(
        'scroll-mt-28 border-0 border-b border-solid border-line py-4 transition-opacity duration-300',
        isDimmed ? 'opacity-50' : 'opacity-100',
      )}
      onMouseEnter={() => onHover(member.id)}
      onMouseLeave={() => onHover(null)}
    >
      {member.blurb ? (
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => onToggle(member.id)}
          onFocus={() => onHover(member.id)}
          onBlur={() => onHover(null)}
          className="m-0 block w-full cursor-pointer appearance-none rounded-md border-0 bg-transparent p-0 text-left font-[inherit] text-inherit focus-visible:outline-[3px] focus-visible:outline-offset-4 focus-visible:outline-gold-soft"
        >
          {heading}
        </button>
      ) : (
        heading
      )}

      {member.blurb && (
        <div
          id={panelId}
          aria-hidden={!isOpen}
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-500 ease-out motion-reduce:transition-none',
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <p className="max-w-[62ch] pl-[38px] pt-3 text-[0.97rem] leading-relaxed text-ink-soft">{member.blurb}</p>
          </div>
        </div>
      )}

      {member.note && (
        <p className="max-w-[62ch] pl-[38px] pt-3 text-[0.78rem] italic leading-snug text-ink-soft">{member.note}</p>
      )}
    </li>
  );
}
