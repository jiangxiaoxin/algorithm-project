专门处理大文件查找而设计的树，每个节点的定义跟二叉树已经完全不一样。

有的书里讲 B 树，有的讲 B+，有的讲 B-，B+和 B-是对 B 树进行了变种，那最基本的 B 树又是啥呢。我看很多地方是 B 树跟 B-树当成一样了。而且对于这些树的性质，描述上也采用不同的角度和方式.

[B+ tree](https://www.geeksforgeeks.org/introduction-of-b-tree/) 

[B- tree](https://www.geeksforgeeks.org/introduction-of-b-tree-2/)
> 感觉这个描述更像是《算法导论》里的B树

[某大学的讲义cs-b tree](https://www.cpp.edu/~ftang/courses/CS241/notes/b-tree.htm)

**geeksforgeeks**后面说明对于**B树**的描述有**两种**，一种是根据**minimum degree**，一种是根据**order**，其中**minimum degress**描述是《算法导论》的方式，**order**是《数据结构、算法和应用c++描述》里采用的描述方式.**minimum degree通常是磁盘上块的大小，用来确定一个节点上能同时存多少个key。**

这某大学的讲义，又说节点里最少有**minimum**个元素，最多有**2*minimum**个元素。


!!!没个统一的说法了吗？

