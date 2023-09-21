import "dotenv/config"; // loads .env file into process.env. NOTE: this should be the first line
import { BusFactor, Responsiveness, Correctness, License, RampUp } from "../src/metrics";

describe("BusFactor", () => {
	beforeEach((): void => {
		jest.setTimeout(20000);
	});

	it("should return a bus factor", async () => {
		const busFactorMetric = new BusFactor("neovim", "neovim");
		const score = await busFactorMetric.evaluate();
		expect(score).toBeDefined();
		expect(busFactorMetric.name).toBe("BusFactor");
		expect(score).toBeGreaterThan(0);
	});

	it("should not find a repo to return a bus factor", async () => {
		const busFactorMetric = new BusFactor("neovm", "neovim");
		const score = await busFactorMetric.evaluate();
		expect(score).toBeDefined();
		expect(busFactorMetric.name).toBe("BusFactor");
		expect(score).toEqual(0);
	});
});

describe("Responsiveness", () => {
	beforeEach((): void => {
		jest.setTimeout(20000);
	});

	it("should return a responsiveness score", async () => {
		const respMetric = new Responsiveness("neovim", "neovim");
		const score = await respMetric.evaluate();
		expect(score).toBeDefined();
		expect(respMetric.name).toBe("Responsiveness");
	});
});

describe("License", () => {
	beforeEach((): void => {
		jest.setTimeout(20000);
	});

	it("should return a license score", async () => {
		const licenseMetric = new License("neovim", "neovim");
		const score = await licenseMetric.evaluate();
		expect(score).toBeDefined();
		expect(licenseMetric.name).toBe("License");
	});
	it("should indicate if a license is *NOT* GPL", async () => {
		const licenseMetric = new License("neovim", "neovim");
		const score = await licenseMetric.evaluate();
		expect(score).toBeDefined();
		expect(licenseMetric.name).toBe("License");
		expect(score).toEqual(0);
	});
	it("should indicate if a license is GPL", async () => {
		const licenseMetric = new License("gwpy", "gwpy");
		const score = await licenseMetric.evaluate();
		expect(score).toBeDefined();
		expect(licenseMetric.name).toBe("License");
		expect(score).toEqual(1);
	});
});

describe("RampUp", () => {
	beforeEach((): void => {
		jest.setTimeout(20000);
	});

	it("should find the readme.md and contributing.md", async () => {
		const rampUpMetric = new RampUp("neovim", "neovim");
		const score = await rampUpMetric.evaluate();
		expect(score).toBeDefined();
		expect(rampUpMetric.name).toBe("RampUp");

		// I know neovim/neovim has a contributing.md and readme.md
		expect(score).toBeGreaterThanOrEqual(0.6);
	});

	it("should find the readme.md and no contributing.md", async () => {
		const rampUpMetric = new RampUp("jonschlinkert", "is-odd");
		const score = await rampUpMetric.evaluate();
		expect(score).toBeDefined();
		expect(rampUpMetric.name).toBe("RampUp");

		// I know jonschlinkert/is-odd has a readme.md but no contributing.md
		expect(score).toBeGreaterThanOrEqual(0.3);
		expect(score).toBeLessThanOrEqual(0.7);
	});
});

describe("Correctness", () => {
	beforeEach((): void => {
		jest.setTimeout(20000);
	});

	it("should return a correctness score", async () => {
		const correctnessMetric = new Correctness("neovim", "neovim");
		const score = await correctnessMetric.evaluate();
		expect(score).toBeDefined();
		expect(correctnessMetric.name).toBe("Correctness");
	});
});