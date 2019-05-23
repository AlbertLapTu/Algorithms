/*

Graph traversal can be tricky to conceptualize at first. The following graph traversal
algorithm is based on the "Course schedule" problem on Leetcode. 

You can find the problem here: 

https://leetcode.com/problems/course-schedule/

*/

const courseSchedule = (numCourses, prerequisites) => {
  const visited = new Set();
  const visiting = new Set();
  const adjacencyMatrix = [...Array(numCourses)].map(row => []);

  /**
   * Goal:
   *
   * Build an adjacency matrix depending on how many courses you need to take.
   * Each index in the adj. matrix holds the course number, where the values at that
   * index is an array which contain all of the pre-requisites that course requires.
   *
   *
   * We'll be using the adjacency matrix array to traverse all required pre-requisites
   * per course, and use two sets to keep track of the current course we are on (visiting)
   * in addition to a visited set to keep track of visited nodes.
   *
   * Note: If we traverse to a node that exists in visited, we have a cyclical graph and
   * should return immediately
   */
  for (let [course, prereq] of prerequisites) {
    adjacencyMatrix[prereq].push(course);
  }

  /**
   * @param {course} prereq
   *
   * On the DFS declaration, the real "work" of the graph traversal algorithm is similar
   * to Tree traversal recursive functions. Instead of checking for a null Tree node,
   * we'll be checking to see if we've visited the course or are currently visiting the course.
   *
   *
   *
   */
  const dfs = course => {
    if (visited.has(course)) return true;
    if (visiting.has(course)) return false;

    visiting.add(course);
    for (let notVisited of adjacencyMatrix[course]) {
      if (!dfs(notVisited)) {
        return false;
      }
    }
    visiting.delete(course);
    visited.add(course);
    return true;
  };

  for (let course = 0; course < numCourses; course++) {
    if (!dfs(course)) {
      return false;
    }
  }
  return true;
};
