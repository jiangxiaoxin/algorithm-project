# 图

## 各种概念

- 图

用`G=(V, E)`来表示，其中 V 是一个非空有限的顶点集合，E 是一个有限的边的集合，边的两个端点都是集合 V 中的顶点。

- 无向图和有向图

如果图中的边是没方向的，就叫无向图。如果途中的边是有方向的，就叫有向图。

- 权重

图中的每条边都可以有一个值，叫权重，可以表示想要的意义。

- 网络

给定一个图`G`,它里面的边给定一个权重函数`w`(就是边会给定权重值)，这样的图也叫**网络**

- 路径

一个边的集合，使得从顶点 v 到顶点 w 连接起来，这就是一条路径。对于无权图，这个边的集合中，边的条数就是路径长度。对于有权图，这些边的权重和就是这条路径的长度。

如果顶点 v 到 w 的路径中，所有途径的顶点都不一样，称为简单路径。**一般研究的对象或者结果都是简单路径**

- 度、出度、入度

以某个顶点`v`为例，集合`E`中所有以这个点`v`为端点的边的数量叫做这个顶点`v`的度。

对于有向图，以`v`为起点的边的数量叫`v`的出度，以`v`为终点的边的数量叫`v`的入度。

- 稀疏图、稠密图、完全图

简单点说，图中的边数比较少就是**稀疏图**，边比较多就是**稠密图**。如果图中任意两点之间都有边，就是**完全图**。

- 连通、连通图、强连通、强连通图、弱连通图

在一个图中，如果顶点 i 和 j 之间有路径，就称 i 和 j 是连通的。

如果一个图中任意两个顶点间都是连通的，则称为连通图。就是任意两个顶点之间都有路径。

> 《数据结构，算法和应用c++实现》里将连通的概念**只针对无向图**，这跟《算法导论》里有很大出入呀。后面的连通分量，子图啥的，这不是没意义了？

强连通：给定一个**有向图**G，如果其中的两个顶点`a`和`b`,存在路径从 a 到 b，从 b 到 a,则称 a 和 b 是强连通的。

强连通图：对于**有向图**G，如果任意两个顶点之间都是强连通的，则该有向图为强连通图。

弱连通图：对于**有向图**G，如果将图中的边用没有方向的边替代，则得到一个无向图，该图称为原图的**基图**。如果一个有向图的基图是连通图，则称该有向图为弱连通图。

> 判断一个图是不是弱连通图，先排除它是强连通图，然后再按照基图是否是连通图去判断。强连通图的基图必然是连通的。

- 连通分量/连通构件【connected component】

给定一个**无向图**，它的顶点集合中很可能有些点并不是连通的，也就是说有些点是孤立成一部分的。那么在这样的无向图中，找出一个**点和边**的集合，使得**尽最大可能将能连起来的顶点连起来**，这就是连通分量（connected component）。【ps：这是我自己的解释】。

一个无向图，它可能有1个 connected component，也可能有好几个connected component。这个怎么分，跟从哪个顶点开始处理是没关系的，因为一个顶点不可能同时在两个component里，那样子说明这俩component能合成一个。

> 如果得出一个集合，图中剩下的点还可以用某条剩下的边连到这个集合中的点上，那这个集合并不是连通分量。一定要**尽最大可能**

- 强连通分量

有向图中的极大的强连通子图就是强连通分量。

> 尽最大可能找出来的子图，只是对于找出来的那个集合来说的，并不是针对原图的大小来说的。在下面的例子中，图中有 6 个顶点，其中顶点 1234 组成一个连通分量，顶点 56 组成一个连通分量，因为这俩集合都尽最大努力去连接其他顶点了，不能因为 56 只连接了 2 个顶点，而 1234 连接了 4 个就说 56 不是。它们都是。

![连通分量](./imgs/连通分量.jpg)

- 二分图 bipartite graph

如果一个图可以将它的顶点分为两个集合 v1 和 v2，使得对于图中所有的边，一头顶点在 v1 中，一头顶点在 v2 中，有这样特征的图叫二分图

## 图的表示方法

- 邻接矩阵

对于一个普通的图，是一个矩阵，`A[i][j]`表示矩阵中的`i`行`j`列，分别对应顶点`i`和顶点`j`，如果`A[i][j]`为`1`，则表示`i`和`j`之间有边，否则`i`和`j`之间没有边。

如果是对于网络，可以将`A[i][j]`记成对应的顶点之间边的权重。

- 邻接表

从每个顶点出发，都对应创建一个链表，表头就是这个顶点，链表上的其余元素就是这个顶点的邻接点（跟这个顶点有边直接连起来的顶点）。

> 这里一般都用邻接链表来表示一个图

> 图的表示有很多种，此处的两种是常见的两种方法。

有权有向图

有权无向图

无权有向图

无权无向图

四种图的代码表示。邻接矩阵和邻接表第一层都是数组，第二层一个是数组，一个是链表

## 常见问题和应用

- [广度优先搜索（BFS）](./广度优先搜索.md)

- [深度优先搜索（DFS）](./深度优先搜索.md)

- [连通分量问题](component-labeling problem)

- [最小生成树问题](./最小生成树问题.md)

给定一个图，想找到这么一个顶点`V`和边`E`的集合，这个集合使得给定图中任意的两个顶点，都有路径可以从一点到达另一点，并且这个集合的**边的权重和是最小**的。

- [最短路径问题](./最短路径问题.md)

在网络中，求两个不同顶点之间的所有
路径中，边的权值和最小的那条路径。

- 二分图

判断一个图是不是二分图。二分图不一定就一种分法。

- 二分图的最大匹配问题
  
  匹配：对于一个二分图，有一个子集 M,它中的任意两条边都没有共同的端点，则称 M 是一个匹配。

  这在讲**网络流**时提到的


- 二分图的最小顶点覆盖问题

这时**贪心算法**里的内容

> 与二分有关的内容是图论里的，有很多个概念。

[Check whether a given graph is Bipartite or not](https://www.geeksforgeeks.org/bipartite-graph/)
[Maximum Bipartite Matching](https://www.geeksforgeeks.org/maximum-bipartite-matching/)

---

### bfs 和 dfs

bfs 和 dfs 可以从某顶点开始，遍历整棵树的所有顶点，那么对于无向图或者有向图，只要使用 bfs 或者 dfs，以起点为参数，在遍历过程中，比较当前点是不是目标点，最后就可以确定从起点到终点目标点之间是否有一条路径，但是并不能记录这条路径，或者比较路径上的 cost。如果输出这条路径，那要在过程中记录下路中的顶点。

```cpp
// dfs 深度优先遍历查找路径
int* findPath(int theSource, int theDestination)
{// Find a path from theSource to theDestination. Return the
  // path in an array using positions 1 on up. path[0] is
  // path length. Return NULL if there is no path.
    // initialize for recursive path finder
    int n = numberOfVertices();
    path = new int [n + 1];
    path[1] = theSource;      // first vertex is always s
    length = 1;               // current path length + 1
    destination = theDestination;
    reach = new int [n + 1];
    for (int i = 1; i <= n; i++)
    {
          reach[i] = 0;
    }
    
    // search for path
    if (theSource == theDestination || rFindPath(theSource))
      // a path was found
      path[0] = length - 1;
    else
    {
      delete [] path;
      path = NULL;
    }
  
    delete [] reach;
    return path;
}

bool rFindPath(int s)
{// Real path finder, performs a depth-first search from s.
  // s should not equal the destination.
  // Return true iff a path to destination is found.
    reach[s] = 1;
    vertexIterator<T>* is = iterator(s);
    int u;
    while ((u = is->next()) != 0)
    {// visit an adjacent vertex of s
      if (reach[u] == 0)   // u is an unreached vertex
      {// move to vertex u
          path[++length] = u; // add u to path
          if (u == destination || rFindPath(u))
            return true;
          // no path from u to destination
          length--;    // remove u from path
      }
    }
    delete is;
    return false;
}
```


### component-labeling problem

了解了连通分量是个啥，labeling 问题就是把图中的点和边分开，在一个分量里的顶点标记上同样的 component label。

方法就是：
1. 从某个顶点开始遍历（bfs 和 dfs都可以），对能遍历到的顶点都标记上 label。
2. 对剩余的边，选择一个顶点，重复步骤1，标记上新的 label。
3. 重复2，直到遍历完所有的节点

> 只处理无向图

### 分割二分图 bipartite graph

既是二分图，那所有的点都将分在两个集合中，标记的集合标志也就是两个，非此即彼，从一个点开始 bfs，先将它标记为 v1， 然后它所有的邻接点都标记 v2，然后对于这些邻接点的下一层邻接点，都标记为 v1， 就这样 v1，v2，v1。。。不断变着标记，最后把所有点都标记完即可。
