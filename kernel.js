export default async function kernel(input) {

// =========================================================
// 🧠 INITIAL STATE
// =========================================================

let state = {
input: normalize(input),
cycle: 0,
maxCycles: 6,
log: [],
valid: {
structure: false,
type: false,
logic: false
}
};

// =========================================================
// 🔁 EXECUTION LOOP
// =========================================================

while (state.cycle < state.maxCycles) {

state.log.push({ cycle: state.cycle, stage: "START" });  

// =========================  
// و ؟ (CHECK 1)  
// =========================  

state.valid.structure = checkStructure(state.input);  

// =========================  
// و ؟ (CHECK 2)  
// =========================  

state.valid.type = checkType(state.input);  

// =========================  
// و ؟ (CHECK 3)  
// =========================  

state.valid.logic = checkLogic(state.input);  

// =========================  
// ل ؟ (DECISION)  
// =========================  

const decision = decide(state);  

state.log.push({ cycle: state.cycle, decision });  

// =========================  
// اعتمد → أصلح  
// =========================  

if (decision === "FIX") {  
  state.input = repair(state.input);  
  state.log.push({ cycle: state.cycle, stage: "REPAIR" });  
}  

// =========================  
// أكمل (EXIT)  
// =========================  

if (decision === "ACCEPT") {  
  state.log.push({ cycle: state.cycle, stage: "EXIT" });  
  break;  
}  

state.cycle++;

}

// =========================================================
// 🏁 OUTPUT
// =========================================================

return finalize(state);
}


---

function normalize(input) {
if (!input) return {};
if (typeof input === "string") return { text: input };
if (typeof input === "object") return input;
return { raw: input };
}

function checkStructure(input) {
return input !== null && input !== undefined;
}

function checkType(input) {
return typeof input === "object" || typeof input === "string";
}

function checkLogic(input) {
return true;
}

function decide(state) {

if (!state.valid.structure) return "FIX";
if (!state.valid.type) return "FIX";
if (!state.valid.logic) return "FIX";

if (state.cycle >= 3) return "ACCEPT";

return "CONTINUE";
}

function repair(input) {

if (typeof input === "string") {
return { text: input, repaired: true };
}

if (typeof input === "object") {
return { ...input, repaired: true };
}

return { repaired: true };
}

function finalize(state) {
return {
status: "DONE",
cycles: state.cycle,
output: state.input,
log: state.log
};
}
شو اعمل فيه
