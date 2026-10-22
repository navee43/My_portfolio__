/**
 * The replay script for the hero.
 *
 * Node ids and function names are the real ones from the agent's LangGraph
 * graph (agent/graph/graph.py). The scenario is the worked example from the
 * project's README: the first attempt uses a column that doesn't exist, the
 * agent diagnoses the KeyError, repairs the code and verifies the result.
 * Timestamps are illustrative.
 */

export type NodeId =
  | "plan"
  | "inspect"
  | "generate"
  | "execute"
  | "verify"
  | "analyze"
  | "repair"
  | "finalize";

export type StepStatus = "run" | "error" | "pass";

export type TraceNode = {
  id: NodeId;
  label: string;
  fn: string;
  col: number;
  row: 0 | 1;
};

export const traceNodes: TraceNode[] = [
  { id: "plan", label: "Plan", fn: "analyze_task", col: 0, row: 0 },
  { id: "inspect", label: "Inspect", fn: "inspect_files", col: 1, row: 0 },
  { id: "generate", label: "Generate", fn: "generate_code", col: 2, row: 0 },
  { id: "execute", label: "Execute", fn: "execute_code", col: 3, row: 0 },
  { id: "verify", label: "Verify", fn: "verify_result", col: 4, row: 0 },
  { id: "repair", label: "Repair", fn: "repair_code", col: 2, row: 1 },
  { id: "analyze", label: "Analyze", fn: "analyze_error", col: 3, row: 1 },
  { id: "finalize", label: "Finish", fn: "finalize", col: 4, row: 1 },
];

/** Graph edges, as wired in the real graph. `kind` styles the edge. */
export const traceEdges: { from: NodeId; to: NodeId; kind: "flow" | "error" | "retry" | "fail" }[] = [
  { from: "plan", to: "inspect", kind: "flow" },
  { from: "inspect", to: "generate", kind: "flow" },
  { from: "generate", to: "execute", kind: "flow" },
  { from: "execute", to: "verify", kind: "flow" },
  { from: "execute", to: "analyze", kind: "error" },
  { from: "analyze", to: "repair", kind: "retry" },
  { from: "repair", to: "execute", kind: "retry" },
  { from: "verify", to: "finalize", kind: "flow" },
  { from: "verify", to: "analyze", kind: "fail" },
];

export type TraceStep = {
  node: NodeId;
  time: string;
  status: StepStatus;
  /** What the status pill says while this step is current. */
  phase: string;
  message: string;
  /** Which code attempt is on screen from this step on (0 = none yet). */
  attempt: 0 | 1 | 2;
};

export const traceSteps: TraceStep[] = [
  {
    node: "plan",
    time: "00:00",
    status: "run",
    phase: "Planning",
    message: "Needs employees.csv, writes result.csv with department and average_salary",
    attempt: 0,
  },
  {
    node: "inspect",
    time: "00:02",
    status: "run",
    phase: "Inspecting files",
    message: "Columns: name, department, annual_salary",
    attempt: 0,
  },
  {
    node: "generate",
    time: "00:04",
    status: "run",
    phase: "Writing code",
    message: "Attempt 1 of 3 ready",
    attempt: 1,
  },
  {
    node: "execute",
    time: "00:05",
    status: "error",
    phase: "Run failed",
    message: "KeyError: 'salary', exit code 1",
    attempt: 1,
  },
  {
    node: "analyze",
    time: "00:06",
    status: "error",
    phase: "Diagnosing",
    message: "KEY_ERROR, the column is annual_salary",
    attempt: 1,
  },
  {
    node: "repair",
    time: "00:08",
    status: "run",
    phase: "Repairing",
    message: "Attempt 2 of 3 targets the column name",
    attempt: 2,
  },
  {
    node: "execute",
    time: "00:09",
    status: "run",
    phase: "Running",
    message: "Exit code 0, result.csv created",
    attempt: 2,
  },
  {
    node: "verify",
    time: "00:10",
    status: "pass",
    phase: "Verifying",
    message: "File, column and row-count checks passed",
    attempt: 2,
  },
  {
    node: "finalize",
    time: "00:11",
    status: "pass",
    phase: "Completed",
    message: "Task completed successfully.",
    attempt: 2,
  },
];

/** The generated solution. Line 5 is the one the repair changes. */
export const codeLines = {
  before: [
    "import pandas as pd",
    "",
    'df = pd.read_csv("employees.csv")',
    'by_dept = df.groupby("department")',
    'avg = by_dept["salary"].mean()',
    'avg.reset_index(name="average_salary") \\',
    '   .to_csv("result.csv", index=False)',
  ],
  fixedLine: 'avg = by_dept["annual_salary"].mean()',
  changedIndex: 4,
};
