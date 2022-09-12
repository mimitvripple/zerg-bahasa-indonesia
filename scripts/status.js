const Ef = require('effect');

const poisoning = new StatusEffect("poisoning");
exports.poisoning = poisoning;
Object.assign(poisoning, {
	color: Color.valueOf("84a94b"),
	damage: 25 / 60,
	effect: Fx.mineSmall,
	damageMultiplier: 1,
	healthMultiplier: 1,
	speedMultiplier: 0.85,
	reloadMultiplier: 0.85,
	buildSpeedMultiplier: 0.85,
})

const dissimilation = extend(StatusEffect, "dissimilation", {
	update(unit, time) {
		if (Math.random() > 0.8) {
			Ef.dissimilation.at(
				unit.x + (Math.random() * unit.type.hitSize - unit.type.hitSize / 2),
				unit.y + (Math.random() * unit.type.hitSize - unit.type.hitSize / 2)
			)
		}
		if (unit.type.outlineColor != Pal.neoplasmOutline) {
			unit.damageContinuousPierce(0.15);
		} else {
			unit.heal(0.5);
			unit.maxHealth = unit.type.health * 1.5
			if (unit.health < unit.type.health) {
				if (Math.random() > 0.78) {
					Fx.neoplasmHeal.at(
						unit.x + (Math.random() * unit.type.hitSize - unit.type.hitSize / 2),
					unit.y + (Math.random() * unit.type.hitSize - unit.type.hitSize / 2)
					)
				}
			}
		}
	}
});
exports.dissimilation = dissimilation
Object.assign(dissimilation, {
	color: Color.valueOf("c33e2b"),
	effect: Fx.none,
	damageMultiplier: 1,
	healthMultiplier: 1,
	speedMultiplier: 1,
	reloadMultiplier: 1.15,
	buildSpeedMultiplier: 1,
})

const extremelyFrozen = extend(StatusEffect, "extremely-frozen", {
	init(){
		this.opposite(StatusEffects.burning, StatusEffects.melting)
	}
})
exports.extremelyFrozen = extremelyFrozen;
Object.assign(extremelyFrozen, {
	color: Color.valueOf("6ecdec"),
	effect: Fx.freezing,
	damage: 0.15,
	damageMultiplier: 1,
	healthMultiplier: 0.2,
	speedMultiplier: 0.2,
	reloadMultiplier: 0.2,
	buildSpeedMultiplier: 0.2,
	dragMultiplier: 0.05,
})