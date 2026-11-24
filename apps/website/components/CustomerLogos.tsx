import clsx from "clsx";
import Image from "next/image";

const logos = [
	{
		name: "VNG Corporation",
		src: "/customers/vng.webp",
		width: 893,
		height: 360,
		size: "sm:max-h-[53px] sm:max-w-[97px]",
	},
	{
		name: "Kameda Medical Center",
		src: "/customers/kameda.webp",
		width: 706,
		height: 360,
		size: "sm:max-h-[67px] sm:max-w-[175px]",
	},
	{
		name: "iFood",
		src: "/customers/ifood.webp",
		width: 681,
		height: 360,
		size: "sm:max-h-[55px] sm:max-w-[115px]",
	},
	{
		name: "American Credit Acceptance",
		src: "/customers/american.webp",
		width: 250,
		height: 103,
		size: "sm:max-h-[64px] sm:max-w-[184px]",
	},
	{
		name: "Opella Health",
		src: "/customers/opella.webp",
		width: 601,
		height: 166,
		size: "sm:max-h-[52px] sm:max-w-[145px]",
	},
	{
		name: "Goodwill Industries",
		src: "/customers/goodwill.webp",
		width: 506,
		height: 221,
		size: "max-h-[55px] max-w-[140px] sm:max-h-[64px] sm:max-w-[170px]",
		item: "min-w-[142px] sm:min-w-[170px]",
	},
	{
		name: "Bandwidth",
		src: "/customers/bandwidth.webp",
		width: 757,
		height: 160,
		size: "sm:max-h-[48px] sm:max-w-[197px]",
	},
	{
		name: "Group-IB",
		src: "/customers/groupib.webp",
		width: 1200,
		height: 235,
		size: "sm:max-h-[48px] sm:max-w-[193px]",
	},
	{
		name: "CreatorIQ",
		src: "/customers/creatoriq.webp",
		width: 675,
		height: 146,
		size: "sm:max-h-[51px] sm:max-w-[181px]",
	},
	{
		name: "Nihon Kohden",
		src: "/customers/nihon.webp",
		width: 678,
		height: 88,
		size: "sm:max-h-[55px] sm:max-w-[190px]",
	},
];

function LogoGroup({ duplicate = false }: { duplicate?: boolean }) {
	return (
		<ul
			aria-hidden={duplicate || undefined}
			className={clsx(
				"flex shrink-0 animate-marquee items-center [gap:var(--gap)]",
				"group-hover:[animation-play-state:paused] motion-reduce:animate-none",
				duplicate && "motion-reduce:hidden",
			)}
		>
			{logos.map((logo) => (
				<li
					key={logo.name}
					className={clsx(
						"flex h-[67px] min-w-[105px] max-w-[230px] shrink-0 items-center justify-center opacity-[0.71] transition-opacity duration-200 hover:opacity-100 sm:h-[76px] sm:min-w-[130px]",
						logo.item,
					)}
				>
					<Image
						src={logo.src}
						alt={duplicate ? "" : logo.name}
						width={logo.width}
						height={logo.height}
						sizes="200px"
						className={clsx(
							"block h-auto max-h-[41px] w-auto max-w-[154px] object-contain",
							logo.size,
						)}
					/>
				</li>
			))}
		</ul>
	);
}

export function CustomerLogos({ className }: { className?: string }) {
	return (
		<section
			aria-label="Trusted by teams"
			className={clsx(
				"relative w-full overflow-hidden bg-black pb-[27px] pt-[19px] sm:pb-9 sm:pt-[26px]",
				className,
			)}
		>
			<div className="mx-auto max-w-[1440px]">
				<p className="mx-auto mb-5 max-w-[360px] px-[18px] text-center text-[13px] font-medium leading-normal tracking-[-0.015em] text-[#999aa5] sm:mb-7 sm:max-w-none sm:text-[15px]">
					Trusted by{" "}
					<strong className="font-semibold text-[#e1e2e9]">1,500+ teams</strong>
					, from solo devs to global enterprises.
				</p>
				<div className="group relative flex w-full overflow-hidden [--duration:47s] [--gap:43px] [gap:var(--gap)] motion-reduce:overflow-x-auto sm:[--duration:54s] sm:[--gap:74px]">
					<LogoGroup />
					<LogoGroup duplicate />
					<div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[clamp(38px,7vw,125px)] bg-gradient-to-r from-black to-transparent motion-reduce:hidden" />
					<div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[clamp(38px,7vw,125px)] bg-gradient-to-l from-black to-transparent motion-reduce:hidden" />
				</div>
			</div>
		</section>
	);
}
